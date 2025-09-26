import { useState, useEffect, useRef } from 'react'
import duffyImage from '../assets/images/duffy.svg'
import './DancingDuffy.css'

const DancingDuffy = () => {
  const [isAnimating, setIsAnimating] = useState(true)
  const [danceSpeed, setDanceSpeed] = useState('normal')
  const buttonRef = useRef(null)

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating)
  }

  const changeDanceSpeed = (speed) => {
    setDanceSpeed(speed)
  }

  // 키보드 접근성 - 스페이스바로 토글
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space' && document.activeElement === buttonRef.current) {
        e.preventDefault()
        toggleAnimation()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  // 자동 춤추기 시작 (3초 후)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isAnimating) {
        setIsAnimating(true)
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [isAnimating])

  return (
    <div className="dancing-duffy-container">
      <div className={`duffy-character ${isAnimating ? 'dancing' : ''} speed-${danceSpeed}`}>
        <img
          src={duffyImage}
          alt="더피가 춤을 춥니다"
          onClick={toggleAnimation}
          role="button"
          tabIndex="0"
        />
        <div className="dance-floor"></div>
      </div>

      <div className="controls">
        <button
          ref={buttonRef}
          onClick={toggleAnimation}
          className="dance-button primary"
          aria-label={isAnimating ? '춤 멈추기' : '춤 시작하기'}
        >
          {isAnimating ? '🛑 춤 멈추기' : '💃 춤 시작하기'}
        </button>

        <div className="speed-controls">
          <button
            className={`speed-button ${danceSpeed === 'slow' ? 'active' : ''}`}
            onClick={() => changeDanceSpeed('slow')}
            aria-label="느린 춤"
            disabled={!isAnimating}
          >
            🐌 느리게
          </button>
          <button
            className={`speed-button ${danceSpeed === 'normal' ? 'active' : ''}`}
            onClick={() => changeDanceSpeed('normal')}
            aria-label="보통 춤"
            disabled={!isAnimating}
          >
            🎵 보통
          </button>
          <button
            className={`speed-button ${danceSpeed === 'fast' ? 'active' : ''}`}
            onClick={() => changeDanceSpeed('fast')}
            aria-label="빠른 춤"
            disabled={!isAnimating}
          >
            ⚡ 빠르게
          </button>
        </div>
      </div>

      <div className="music-notes">
        <div className="note">♪</div>
        <div className="note">♫</div>
        <div className="note">♪</div>
        <div className="note">♫</div>
      </div>

      {isAnimating && (
        <div className="dance-info">
          <p>더피가 {danceSpeed === 'slow' ? '천천히' : danceSpeed === 'fast' ? '신나게' : '즐겁게'} 춤을 추고 있어요!</p>
        </div>
      )}
    </div>
  )
}

export default DancingDuffy