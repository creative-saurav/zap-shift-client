import { Box } from 'lucide-react';
import { Link } from 'react-router';

const Logo = ({ target }) => {
    return (
    <Link to='/' target={target} className="zip-brand" aria-label="Wayline Delivery home">
      <span className="zip-brand-mark"><Box size={19} strokeWidth={2.2} /></span>
      <span>Wayline<span className="zip-brand-accent"> Delivery</span></span>
    </Link>
    );
};

export default Logo;