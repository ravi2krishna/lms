import { useEffect, useRef } from "react";
import { buildURL } from "../lib/strings";
import "./vimeo-video.css";

type VimeoVideoProps = {
  videoId: string;
  params?: Record<string, string>;
  width?: number;
  height?: number;
};

function VimeoVideo(props: VimeoVideoProps) {
  const playerIframeRef = useRef<HTMLIFrameElement>(null);
  // let player = new Vimeo.Player(playerIframeRef);
  useEffect(() => {
    if (!playerIframeRef.current) {
      return;
    }
    // const player = new vimeo.Player(playerIframeRef.current);
    // player.on("play", (event) => {
    //   console.log("music started...");
    //   console.log(event);
    // });
  }, []);

  return (
    <div className="vimeo-full-width">
      <iframe
        id="vimeo-player"
        ref={playerIframeRef}
        src={buildURL(
          `https://player.vimeo.com/video/${props.videoId}`,
          props.params
        )}
        frameBorder={0}
        // height={'h-[75vh]'}
        // webkitallowfullscreen
        // mozallowfullscreen
        allowFullScreen
      />
    </div>
  );
}

export default VimeoVideo;
