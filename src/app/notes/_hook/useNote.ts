import { getNoteEntries } from '@/db/queries/contents';

const useNote = async () => getNoteEntries();

export default useNote;
