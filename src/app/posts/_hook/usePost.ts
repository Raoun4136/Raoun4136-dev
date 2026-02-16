import { getPostEntries } from '@/db/queries/contents';

const usePost = async () => getPostEntries();

export default usePost;
