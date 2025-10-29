import { Link } from "react-router-dom";

export default function PostCard({ post }) {
    return (
        <Link to={`/blog/${post.id}`} className="block border p-4 rounded shadow hover:shadow-lg">
            <h2 className="font-semibold text-lg">{post.title}</h2>
            <p>{post.body.substring(0, 80)}...</p>
        </Link>
    );
}
