import Image from 'next/image';
import useImageFadeIn from '../hooks/useImageFadeIn';

const firstColumnSizes = 'auto, (min-width: 622px) 57vw, 100vw';
const secondColumnSizes = 'auto, (min-width: 622px) 43vw, 100vw';

 const Montage = () => {

   useImageFadeIn();

   return (

      <section className="montage">
         <div className="montage-col-1">
            <div className="everton">
               <Image 
                  src="/img/everton.webp" 
                  alt="Everton" 
                  className="montage-image image-fade-in"
                  fill={true}
                  sizes={firstColumnSizes}
               />
            </div>
            <div className="wcb">
               <Image 
                  src="/img/wcb.webp" 
                  alt="FIFA World Cup 2010" 
                  className="montage-image wcb image-fade-in"
                  fill={true}
                  sizes={firstColumnSizes}
               />
            </div>
         </div>
         <div className="montage-col-2">
            <div className="united">
               <Image 
                  src="/img/united.webp" 
                  alt="Manchester United" 
                  className="montage-image united image-fade-in"
                  fill={true}
                  sizes={secondColumnSizes}
               />
            </div>
            <div className="ftctc">
               <Image 
                  src="/img/ftctc.webp" 
                  alt="From the Caribbean 2 Coventry" 
                  className="montage-image ftc2c image-fade-in"
                  fill={true}
                  sizes={secondColumnSizes}
               />
            </div>
            <div className="city">
               <Image 
                  src="/img/city.webp" 
                  alt="Manchester City" 
                  className="montage-image city image-fade-in"
                  fill={true}
                  sizes={secondColumnSizes}
               />
            </div>
         </div>
      </section>

   );
}

export default Montage;
