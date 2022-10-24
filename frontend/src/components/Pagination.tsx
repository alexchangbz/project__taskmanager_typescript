import './pagination.css'

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }: any) => {
    let pageNumbers: any = []

    for(let i = 1; i <= Math.ceil(totalPosts.length / postsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map((number: any) => (
                    <li key={number}>
                        <input type="submit" onClick={() => paginate(number)} className={(currentPage === number) ? "active" : ""}  value={number} />
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination