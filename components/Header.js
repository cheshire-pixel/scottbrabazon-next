import { useRouter } from 'next/router';
import useDrawLine from '../hooks/useDrawLine';

const Header = () => {
    const lineRef = useDrawLine();
    const router = useRouter();
    const currentPage = router.pathname === '/' ? 'home' : router.pathname.split('/')[1];

    return (
        <header className={`header grid-container ${currentPage}`}>
            <div className="content">
                <h2 className="small-caps">Scott Brabazon / {currentPage}</h2>
                <h1>
                    <span>Designer <span className="serif">&amp;</span></span><br />
                    <span
                        style={{
                            background: 'url(/img/grad-1-bg.webp)',
                            backgroundSize: '100%',
                            backgroundPosition: 'center',
                            color: 'transparent',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            display: 'inline-block'
                        }}
                    >
                        <span className="italic">Frontend</span> developer
                    </span>
                </h1>
                <div className="line-container">
                    <div className="line" ref={lineRef}></div>
                </div>
            </div>

        </header>
    );
};

export default Header;
