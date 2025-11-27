export type CommunityPost = {
    id: string;
    communityId: string; 
    content: string; 
    createdAt: string;

    author: {
        id: string; 
        name: string;
        profileImage: string;
    }
};

const LOCAL_STORAGE_POSTS_KEY = 'communityPosts';

export function getPostagens(): CommunityPost[] {
    try {
        const postsJSON = localStorage.getItem(LOCAL_STORAGE_POSTS_KEY);
        return postsJSON ? JSON.parse(postsJSON) : [];
    } catch (e) {
        console.error("Erro ao carregar postagens do localStorage:", e);
        return [];
    }
}

export function savePostagens(posts: CommunityPost[]): void {
    try {
        localStorage.setItem(LOCAL_STORAGE_POSTS_KEY, JSON.stringify(posts));
    } catch (e) {
        console.error("Erro ao salvar postagens no localStorage:", e);
    }
}