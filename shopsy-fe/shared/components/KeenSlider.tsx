/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { ReactChild, FC, useState, LegacyRef } from 'react'
import { range } from 'lodash'

interface Props {
  slides: ReactChild[]
  loop?: boolean
  slidesPerView?: number
  showNavigation?: boolean
  spacing?: number
}

const ArrowLeft = ({ disabled, onClick }) => {
  const arrowClass = disabled ? ' arrow--disabled' : ''
  return (
    <svg
      onClick={onClick}
      className={`arrow arrow--left${arrowClass}`}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
    >
      <path d='M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z' />
    </svg>
  )
}

const ArrowRight = ({ disabled, onClick }) => {
  const arrowClass = disabled ? ' arrow--disabled' : ''
  return (
    <svg
      onClick={onClick}
      className={`arrow arrow--right${arrowClass}`}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
    >
      <path d='M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z' />
    </svg>
  )
}

export const Slider: FC<Props> = ({
  slides: slidesFromProps,
  loop = false,
  showNavigation = true,
  slidesPerView = 1,
  spacing = 0
}) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [sliderRef, slider] = useKeenSlider({
    initial: 0,
    loop,
    spacing,
    slidesPerView,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide)
    }
  })
  const slides = [...slidesFromProps]
  if (slidesPerView > slides.length) {
    for (let i = 0; i <= slidesPerView - slides.length; i++) {
      slides.push(<></>)
    }
  }
  const sliderSlides = slides.map((x, i) => (
    // eslint-disable-next-line react/no-array-index-key
    <div className='keen-slider__slide' key={i}>
      {x}
    </div>
  ))

  return (
    <div className='wrapper'>
      <div ref={sliderRef as LegacyRef<HTMLDivElement>} className='keen-slider'>
        {sliderSlides}
      </div>
      {slider && (
        <>
          <ArrowLeft
            onClick={(e) => e.stopPropagation() || slider.prev()}
            disabled={currentSlide === 0}
          />
          <ArrowRight
            onClick={(e) => e.stopPropagation() || slider.next()}
            disabled={currentSlide >= slider.details().size - slidesPerView}
          />
        </>
      )}
      {slider && showNavigation && (
        <div className='dots'>
          {range(slides.length).map((idx) => (
            <button
              key={idx}
              onClick={() => {
                slider.moveToSlideRelative(idx)
              }}
              className={`dot${currentSlide === idx ? ' active' : ''}`}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        .wrapper {
          position: relative;
        }

        .dots {
          display: flex;
          padding: 10px 0;
          justify-content: center;
        }

        .dot {
          border: none;
          width: 10px;
          height: 10px;
          background: #c5c5c5;
          border-radius: 50%;
          margin: 0 5px;
          padding: 5px;
          cursor: pointer;
        }

        .dot:focus {
          outline: none;
        }

        .dot.active {
          background: #000;
        }

        :global(.arrow) {
          width: 30px;
          height: 30px;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          -webkit-transform: translateY(-50%);
          fill: var(--primary);
          cursor: pointer;
        }

        :global(.arrow--left) {
          left: 5px;
        }

        :global(.arrow--right) {
          left: auto;
          right: 5px;
        }

        :global(.arrow--disabled) {
          fill: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  )
}
