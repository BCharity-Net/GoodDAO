import { useRouter } from 'next/router'

function ActiveLink({ children, href }: any) {
    const router = useRouter()

    const style = {
        marginRight: 10,
        color: router.asPath === href ? 'red' : 'black',
        marginTop: 50
    }

    const handleClick = (e: any) => {
        e.preventDefault()
        router.push(href)
    }

    return (
        <div>
            <a href={href} onClick={handleClick} style={style}>
                {children}
            </a>
            <br></br>
            <br></br>
            <br></br>
            <h1 className='absolute left-1/2 top-1/2'>{router.asPath}</h1>
        </div>
    )
}

export default ActiveLink