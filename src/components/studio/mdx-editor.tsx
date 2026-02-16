'use client';

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ClipboardEvent,
  type DragEvent,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { markdown } from '@codemirror/lang-markdown';
import { oneDark } from '@codemirror/theme-one-dark';
import { MDXClient } from 'next-mdx-remote-client/csr';
import { serialize } from 'next-mdx-remote-client/serialize';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeSlug from 'rehype-slug';
import { useTheme } from 'next-themes';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { ImagePlus, Maximize2, Minimize2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';

type MdxEditorProps = {
  name: string;
  initialValue: string;
  minHeight?: string;
  formId?: string;
};

type EditorViewLike = {
  state: {
    selection: {
      main: {
        from: number;
        to: number;
      };
    };
  };
  scrollDOM?: HTMLElement;
  dispatch: (spec: {
    changes: { from: number; to: number; insert: string };
    selection: { anchor: number };
    scrollIntoView: boolean;
  }) => void;
  focus: () => void;
};

const PreviewRenderError = ({ error }: { error: Error }) => (
  <div className="rounded-md border border-destructive/35 bg-destructive/10 px-3 py-2 text-sm text-destructive">
    프리뷰 렌더링 오류: {error.message}
  </div>
);

const toErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  if (typeof error === 'object' && error !== null && 'message' in error) {
    const message = (error as { message?: unknown }).message;
    if (typeof message === 'string') return message;
  }
  return '알 수 없는 컴파일 오류가 발생했습니다.';
};

export default function MdxEditor({
  name,
  initialValue,
  minHeight = '560px',
  formId,
}: MdxEditorProps) {
  const [value, setValue] = useState(initialValue);
  const [mounted, setMounted] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const [previewCompiledSource, setPreviewCompiledSource] = useState('');
  const [previewError, setPreviewError] = useState<string | null>(null);
  const [previewPending, setPreviewPending] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [urlInsertOpen, setUrlInsertOpen] = useState(false);
  const [urlInsertValue, setUrlInsertValue] = useState('');
  const [urlInsertAltValue, setUrlInsertAltValue] = useState('이미지');
  const [draggingImage, setDraggingImage] = useState(false);
  const hiddenInputRef = useRef<HTMLInputElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const editorViewRef = useRef<EditorViewLike | null>(null);
  const previousValueRef = useRef(initialValue);
  const previewJobRef = useRef(0);
  const lastPreviewErrorToastRef = useRef<string | null>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setValue(initialValue);
    previousValueRef.current = initialValue;
  }, [initialValue]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (value === previousValueRef.current) return;
    previousValueRef.current = value;
    hiddenInputRef.current?.dispatchEvent(new Event('input', { bubbles: true }));
  }, [value]);

  const extensions = useMemo(() => [markdown()], []);
  const editorTheme = mounted && resolvedTheme === 'dark' ? oneDark : 'light';
  const shouldRenderPreview = reviewMode;

  useEffect(() => {
    if (!shouldRenderPreview) return;

    const jobId = ++previewJobRef.current;
    setPreviewPending(true);

    const timer = window.setTimeout(async () => {
      try {
        const result = await serialize({
          source: value,
          options: {
            disableExports: true,
            disableImports: true,
            mdxOptions: {
              remarkPlugins: [remarkGfm, remarkBreaks],
              rehypePlugins: [
                rehypeSlug,
                [
                  rehypeAutolinkHeadings,
                  {
                    behavior: 'wrap',
                    properties: {
                      className: ['anchor'],
                    },
                  },
                ],
                [
                  rehypeExternalLinks,
                  {
                    properties: {
                      className: ['external-link'],
                    },
                    target: '_blank',
                    rel: ['noopener noreferrer'],
                  },
                ],
              ],
            },
          },
        });

        if (previewJobRef.current !== jobId) return;

        if ('error' in result) {
          setPreviewCompiledSource('');
          setPreviewError(toErrorMessage(result.error));
        } else {
          setPreviewCompiledSource(result.compiledSource);
          setPreviewError(null);
        }
      } catch (error) {
        if (previewJobRef.current !== jobId) return;
        setPreviewCompiledSource('');
        setPreviewError(toErrorMessage(error));
      }

      setPreviewPending(false);
    }, 220);

    return () => window.clearTimeout(timer);
  }, [shouldRenderPreview, value]);

  useEffect(() => {
    if (!formId) return;

    const handleSaveShortcut = (event: KeyboardEvent) => {
      if (!(event.metaKey || event.ctrlKey)) return;
      if (event.key.toLowerCase() !== 's') return;

      event.preventDefault();

      const form = document.getElementById(formId) as HTMLFormElement | null;
      if (!form) return;

      const saveButton = document.getElementById(`${formId}-save-button`) as HTMLButtonElement | null;
      if (saveButton) {
        form.requestSubmit(saveButton);
        return;
      }

      form.requestSubmit();
    };

    window.addEventListener('keydown', handleSaveShortcut);
    return () => window.removeEventListener('keydown', handleSaveShortcut);
  }, [formId]);

  useEffect(() => {
    if (!reviewMode) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setReviewMode(false);
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [reviewMode]);

  useEffect(() => {
    if (!reviewMode) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [reviewMode]);

  useEffect(() => {
    if (!reviewMode || !previewError) {
      lastPreviewErrorToastRef.current = null;
      toast.dismiss('studio-preview-error');
      return;
    }
    if (lastPreviewErrorToastRef.current === previewError) return;

    lastPreviewErrorToastRef.current = previewError;
    toast.error('프리뷰 컴파일 오류', {
      id: 'studio-preview-error',
      description: previewError,
    });
  }, [previewError, reviewMode]);

  const insertSnippetAtCursor = (snippet: string) => {
    const view = editorViewRef.current;
    if (!view) {
      setValue((current) => `${current}${current.endsWith('\n') ? '' : '\n'}${snippet}`);
      return;
    }

    const { from, to } = view.state.selection.main;
    view.dispatch({
      changes: { from, to, insert: snippet },
      selection: { anchor: from + snippet.length },
      scrollIntoView: true,
    });
    view.focus();
  };

  const openImagePicker = () => {
    imageInputRef.current?.click();
  };

  const getImageFilesFromDataTransfer = (dataTransfer: DataTransfer | null) => {
    if (!dataTransfer) return [] as File[];

    const directFiles = Array.from(dataTransfer.files ?? []).filter((file) =>
      file.type.startsWith('image/'),
    );
    if (directFiles.length > 0) return directFiles;

    return Array.from(dataTransfer.items ?? [])
      .filter((item) => item.kind === 'file' && item.type.startsWith('image/'))
      .map((item) => item.getAsFile())
      .filter((file): file is File => file !== null);
  };

  const getImageAlt = (fileName: string) => {
    const index = fileName.lastIndexOf('.');
    return (index > 0 ? fileName.slice(0, index) : fileName).replace(/[-_]+/g, ' ');
  };

  const insertTemplateImage = () => {
    insertSnippetAtCursor('\n![이미지 설명](/images/example.png)\n');
  };

  const insertImageByUrl = () => {
    const url = urlInsertValue.trim();
    if (!url) return;

    const isAbsoluteHttp = /^https?:\/\//i.test(url);
    const isRootRelative = url.startsWith('/');

    if (!isAbsoluteHttp && !isRootRelative) {
      toast.error('이미지 URL은 https:// 또는 / 로 시작해야 합니다.');
      return;
    }

    const alt = urlInsertAltValue.trim() || '이미지';
    insertSnippetAtCursor(`\n![${alt}](${url})\n`);
    setUrlInsertOpen(false);
  };

  const openImageUrlInsertDialog = () => {
    setUrlInsertValue('');
    setUrlInsertAltValue('이미지');
    setUrlInsertOpen(true);
  };

  const handleUrlInsertInputKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    insertImageByUrl();
  };

  const uploadSingleImage = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/studio/upload', {
      method: 'POST',
      body: formData,
    });

    const payload = (await response.json()) as { ok: true; url: string } | { ok: false; message?: string };

    if (!response.ok || !payload.ok) {
      throw new Error(payload.ok ? '이미지 업로드에 실패했습니다.' : payload.message ?? '이미지 업로드에 실패했습니다.');
    }

    return payload.url;
  };

  const handleImageUpload = async (files: File[]) => {
    if (files.length === 0) return;
    setUploadingImage(true);

    try {
      for (const file of files) {
        const uploadedUrl = await uploadSingleImage(file);
        insertSnippetAtCursor(`\n![${getImageAlt(file.name)}](${uploadedUrl})\n`);
      }
    } catch (error) {
      toast.error('이미지 업로드 오류', {
        id: 'studio-upload-error',
        description: toErrorMessage(error),
      });
    } finally {
      setUploadingImage(false);
      if (imageInputRef.current) {
        imageInputRef.current.value = '';
      }
    }
  };

  const handleEditorDragOver = (event: DragEvent<HTMLDivElement>) => {
    const files = getImageFilesFromDataTransfer(event.dataTransfer);
    if (files.length === 0) return;
    event.preventDefault();
    if (!draggingImage) setDraggingImage(true);
  };

  const handleEditorDragLeave = (event: DragEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setDraggingImage(false);
    }
  };

  const handleEditorDrop = (event: DragEvent<HTMLDivElement>) => {
    const files = getImageFilesFromDataTransfer(event.dataTransfer);
    if (files.length === 0) return;
    event.preventDefault();
    setDraggingImage(false);
    void handleImageUpload(files);
  };

  const handleEditorPaste = (event: ClipboardEvent<HTMLDivElement>) => {
    const files = getImageFilesFromDataTransfer(event.clipboardData);
    if (files.length === 0) return;
    event.preventDefault();
    void handleImageUpload(files);
  };

  const renderEditor = (height: string) => (
    <div
      style={{ height }}
      className="h-full min-h-0 overflow-auto rounded-md border border-border/70 bg-background"
    >
      <CodeMirror
        value={value}
        height="100%"
        className="[&_.cm-editor]:h-full [&_.cm-scroller]:max-h-full [&_.cm-scroller]:overflow-auto [&_.cm-content]:min-h-full"
        extensions={extensions}
        theme={editorTheme}
        onCreateEditor={(view) => {
          const editorView = view as unknown as EditorViewLike;
          editorViewRef.current = editorView;
          if (editorView.scrollDOM) {
            editorView.scrollDOM.style.height = '100%';
            editorView.scrollDOM.style.maxHeight = '100%';
            editorView.scrollDOM.style.overflow = 'auto';
          }
        }}
        onChange={setValue}
      />
    </div>
  );

  const renderEditorDropZone = (height: string, fullHeight = false) => (
    <div
      className={
        [
          fullHeight ? 'h-full min-h-0' : '',
          draggingImage ? 'rounded-md border-2 border-dashed border-primary/55 p-1' : '',
        ]
          .filter(Boolean)
          .join(' ') || undefined
      }
      onDragOver={handleEditorDragOver}
      onDragLeave={handleEditorDragLeave}
      onDrop={handleEditorDrop}
      onPaste={handleEditorPaste}
    >
      {renderEditor(height)}
    </div>
  );

  const renderPreview = (height: string) => (
    <div
      style={{ height }}
      className="flex h-full min-h-0 flex-col overflow-hidden rounded-md border border-border/70 bg-background"
    >
      <header className="flex items-center justify-between border-b border-border/70 px-3 py-2">
        <span className="text-xs font-medium">미리보기</span>
        <span className="text-[11px] text-foreground/65">{previewPending ? '렌더링 중…' : '실시간 반영'}</span>
      </header>
      <div className="flex-1 overflow-auto px-4 py-3">
        {previewError ? (
          <div className="rounded-md border border-destructive/35 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            프리뷰 컴파일 오류: {previewError}
          </div>
        ) : previewCompiledSource ? (
          <article className="mdx" data-motion-state="ready">
            <MDXClient compiledSource={previewCompiledSource} onError={PreviewRenderError} />
          </article>
        ) : (
          <p className="text-sm text-foreground/70">프리뷰를 준비하고 있습니다…</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-2">
      <input ref={hiddenInputRef} type="hidden" name={name} value={value} readOnly />
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        multiple
        onChange={(event) => {
          const files = Array.from(event.target.files ?? []).filter((file) => file.type.startsWith('image/'));
          if (files.length === 0) return;
          void handleImageUpload(files);
        }}
      />

      <div className="flex flex-wrap items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button type="button" variant="outline" disabled={uploadingImage}>
              <ImagePlus className="h-4 w-4" />
              {uploadingImage ? '업로드 중…' : '이미지'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onSelect={openImagePicker}>업로드해서 삽입</DropdownMenuItem>
            <DropdownMenuItem onSelect={openImageUrlInsertDialog}>URL로 삽입</DropdownMenuItem>
            <DropdownMenuItem onSelect={insertTemplateImage}>템플릿 삽입</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          type="button"
          size="icon"
          variant="outline"
          onClick={() => setReviewMode((current) => !current)}
          title={reviewMode ? '검토 모드 닫기' : '검토 모드 열기'}
        >
          {reviewMode ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          <span className="sr-only">{reviewMode ? '검토 모드 닫기' : '검토 모드 열기'}</span>
        </Button>

        <span className="ml-auto text-xs text-foreground/68">
          {reviewMode ? 'Esc로 검토 모드를 닫을 수 있어요.' : '저장 단축키: Cmd/Ctrl + S'}
        </span>
      </div>

      <Dialog open={urlInsertOpen} onOpenChange={setUrlInsertOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>이미지 URL 삽입</DialogTitle>
            <DialogDescription>URL과 대체 텍스트를 입력하면 현재 커서 위치에 삽입됩니다.</DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            <div className="space-y-1.5">
              <label htmlFor="studio-image-url" className="text-sm font-medium">
                Image URL
              </label>
              <Input
                id="studio-image-url"
                value={urlInsertValue}
                onChange={(event) => setUrlInsertValue(event.target.value)}
                onKeyDown={handleUrlInsertInputKeyDown}
                placeholder="https://example.com/image.png 또는 /images/image.png"
                autoFocus
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="studio-image-alt" className="text-sm font-medium">
                Alt Text
              </label>
              <Input
                id="studio-image-alt"
                value={urlInsertAltValue}
                onChange={(event) => setUrlInsertAltValue(event.target.value)}
                onKeyDown={handleUrlInsertInputKeyDown}
                placeholder="이미지 설명"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setUrlInsertOpen(false)}>
              취소
            </Button>
            <Button type="button" onClick={insertImageByUrl}>
              삽입
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {!reviewMode && renderEditorDropZone(minHeight)}

      {reviewMode && (
        <div className="fixed inset-0 z-[800] bg-background/98 px-3 py-3 backdrop-blur-sm sm:px-5">
          <div className="mx-auto flex w-full max-w-[1700px] items-center justify-between gap-3 pb-3">
            <div>
              <p className="text-sm font-semibold">검토 모드</p>
              <p className="text-xs text-foreground/68">
                좌측은 편집, 우측은 실제 스타일 미리보기입니다. 가운데 손잡이로 폭을 조절할 수 있어요.
              </p>
            </div>
            <Button type="button" size="sm" variant="outline" onClick={() => setReviewMode(false)}>
              닫기
            </Button>
          </div>

          <ResizablePanelGroup
            direction="horizontal"
            className="mx-auto h-[calc(100dvh-5.6rem)] w-full max-w-[1700px]"
          >
            <ResizablePanel defaultSize={52} minSize={28} className="min-h-0">
              {renderEditorDropZone('100%', true)}
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={48} minSize={28} className="min-h-0">
              {renderPreview('100%')}
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      )}
    </div>
  );
}
