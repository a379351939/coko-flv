import React, {useRef, useCallback, useEffect} from 'react'
import flvJs from 'flv.js';

interface CokoFlvProps {
  url: string;
  videoEleOpt?: object;
  mediaDataSource?: object;
  config?: object;
  diffCritical?: number, // 超过*秒以上就进行跳转
  diffSpeedUp?: number, // 超过*秒以上则进行视频加速播放
  latest?: number, // 缓冲区最小时间间隔
  delay?: number, // 校验追帧间隔，单位ms
  reconnectLimit?: number, // 断流重连次数限制
}

function CokoFlv({ url,
                   videoEleOpt = {},
                   mediaDataSource = {},
                   config = {},
                   diffCritical = 6,
                   diffSpeedUp = 4,
                   latest = 1,
                   delay = 5000,
                   reconnectLimit = 5,
                  } : CokoFlvProps) {
  const videoRef = useRef<HTMLVideoElement | null >(null)
  const flvRef = useRef<flvJs.Player | null>(null)
  const timerRef = useRef<number | null>(null)
  const reconnectCountRef = useRef<number>(0)

  const init = useCallback(()=>{
      const videoEle = videoRef.current;
      if (videoEle && flvJs.isSupported() && url) {
        const player = flvJs.createPlayer(
          {
            type: 'flv',
            url,
            ...mediaDataSource,
          },
          {...config},
        );
        player.attachMediaElement(videoEle);
        player.load()
        player.on(flvJs.Events.ERROR, onVideoErr);
        flvRef.current = player;
        videoEle.addEventListener('play',onVideoPlay)
        videoEle.addEventListener('pause', onVideoPause)
      }
    }, [url]
  )

  const dispose = () => {
    const player = flvRef.current
    const videoEle = videoRef.current;

    if(player) {
      player.off(flvJs.Events.ERROR, onVideoErr);
      player.pause()
      player.unload()
      player.detachMediaElement()
      player.destroy()
      flvRef.current = null
    }

    if(videoEle) {
      videoEle.removeEventListener('play', onVideoPlay)
      videoEle.removeEventListener('pause', onVideoPause)
    }
  }

  const reBuild = () => {
    if(reconnectCountRef.current < reconnectLimit){
      clearIntervalTimer()
      dispose()
      init()
      reconnectCountRef.current++
      setTimeout(()=>{
        flvRef.current && flvRef.current.play()
      }, 500)
    }
  }


  const clearIntervalTimer = () => {
    if(timerRef.current !== null) clearInterval(timerRef.current)
  }


  const intervalSetCurTime =  () => {
    const player = flvRef.current
    const videoEle = videoRef.current;
    const maxPlaybackRate = 4 // 最大播放速度

    clearIntervalTimer()
    if(videoEle === null)  return
    if(player !== null) {
      timerRef.current = window.setInterval(() => {
        const currentTime = videoEle.currentTime
        const buffered = videoEle.buffered

        if(currentTime === 0) return
        if(buffered.length > 0) {
          const end = buffered.end(0)
          const diff = end - currentTime
          let playbackRate = 1.0
          if(diff > diffCritical) { //进行跳转
            videoEle.currentTime = end - latest
          } else if(diff > diffSpeedUp) { // 加速播放
            const diffRate = 1 + diff/(delay/1000)
            playbackRate = Math.max(1, Math.min(diffRate, maxPlaybackRate))
          }
          videoEle.playbackRate = playbackRate
        }
      }, delay);
    }
  }

  const onVideoPlay = () => {
    const player = flvRef.current
    intervalSetCurTime()
    if(player){
      player.on(flvJs.Events.LOADING_COMPLETE, reBuild);
    }
  }

  const onVideoPause = () => {
    const player = flvRef.current
    clearIntervalTimer()
    if(player){
      player.off(flvJs.Events.LOADING_COMPLETE, reBuild);
    }
  }

  const onVideoErr = () =>  {
    clearIntervalTimer()
  }

  useEffect(()=> {
    if(url) {
      dispose()
      init()
    }
    return () => dispose()
  },[url])

  return (
    <video ref={videoRef} controls {...videoEleOpt}>
      {"Your browser is too old which doesn't support HTML5 video."}
    </video>
  )
}

export default CokoFlv
