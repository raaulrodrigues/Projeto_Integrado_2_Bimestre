export default function Card({ children }) {
    return (
        <div className="p-4 bg-white rounded shadow-md">
            {children}
        </div>
    );
}