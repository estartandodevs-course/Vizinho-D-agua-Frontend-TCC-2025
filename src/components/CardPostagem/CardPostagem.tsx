import type { CommunityPost } from '../../mocks/postagens.mock';
import './CardPostagem.css';

type CardPostagemProps = {
    post: CommunityPost;
}

export default function CardPostagem({ post }: CardPostagemProps) {
    
    const galleryClass = 
        post.images?.length === 1 ? 'gallery-1' :
        post.images?.length === 2 ? 'gallery-2' :
        'gallery-mosaic';

    return (
        <article className="card-post-container">
            <header className="card-post-header">
                <img 
                    src={post.author.profileImage} 
                    alt={post.author.name}
                    className="card-post-avatar"
                />
                <div className="card-post-info">
                    <h2 className="card-post-autor">{post.author.name} · <span className="card-post-data">{post.createdAt}</span></h2>
                </div>
            </header>

            <div className="card-post-body">
                <p className="card-post-texto">{post.content}</p>

                {post.images && post.images.length > 0 && (
                    <div className={`card-post-gallery ${galleryClass}`}>
                        {post.images.map((imgUrl, index) => (
                            <img 
                                key={index}
                                src={imgUrl} 
                                alt={`Postagem ${post.id} imagem ${index + 1}`} 
                                className="card-post-imagem"
                            />
                        ))}
                    </div>
                )}
            </div>
        </article>
    );
}