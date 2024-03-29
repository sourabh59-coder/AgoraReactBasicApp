import type { IRemoteVideoTrack } from "agora-rtc-react";
import { RemoteVideoPlayer } from "../agoraui/index";

import { fakeAvatar, fakeName } from "../utils";

import { AutoLayout } from "./AutoLayout";
import { Label } from "./Label";

export function RenderRemoteUsers({ videoTracks }: { videoTracks: IRemoteVideoTrack[] }) {
  return (
    <>
      {videoTracks.map((track: IRemoteVideoTrack) => (
        <AutoLayout.Item key={track.getUserId()}>
          <RemoteVideoPlayer cover={fakeAvatar()} key={track.getUserId()} track={track} />
          <Label>{`${fakeName(track.getUserId())}{${track.getUserId()}}`}</Label>
        </AutoLayout.Item>
      ))}
    </>
  );
}
