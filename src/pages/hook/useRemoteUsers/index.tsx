import {
  RemoteUser,
  useCurrentUID,
  useIsConnected,
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRemoteUsers,
} from "agora-rtc-react";
import { LocalMicrophoneAndCameraUser } from "../../../agoraui/index";
import { useMemo, useState } from "react";

import { AutoLayout, Container, Label, MediaControl, UsersInfo } from "../../../components";
import { appConfig, fakeAvatar, fakeName } from "../../../utils";

export const UseRemoteUsers = () => {
  const [calling, setCalling] = useState(false);
  const isConnected = useIsConnected();

  const uid = useCurrentUID() || 0;
  const userName = useMemo(() => fakeName(uid), [uid]);
  const userAvatar = useMemo(() => fakeAvatar(), []);

  useJoin(
    {
      appid: appConfig.appId,
      channel: appConfig.channel,
      token: appConfig.token,
    },
    calling,
  );

  //local
  const [micOn, setMic] = useState(false);
  const [cameraOn, setCamera] = useState(false);
  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  const { localCameraTrack } = useLocalCameraTrack(cameraOn);
  usePublish([localMicrophoneTrack, localCameraTrack]);

  //remote
  const remoteUsers = useRemoteUsers();
  const publishedUsers = remoteUsers.filter(user => user.hasAudio || user.hasVideo);

  return (
    <Container>
      <>
        <UsersInfo
          published={publishedUsers.length + (micOn || cameraOn ? 1 : 0)}
          total={remoteUsers.length + 1}
        />
        <AutoLayout>
          {isConnected && (
            <AutoLayout.Item>
              <LocalMicrophoneAndCameraUser
                audioTrack={localMicrophoneTrack}
                cameraOn={cameraOn}
                cover={userAvatar}
                micOn={micOn}
                videoTrack={localCameraTrack}
              >
                {<Label>{`${userName}{${uid}}`}</Label>}
              </LocalMicrophoneAndCameraUser>
            </AutoLayout.Item>
          )}
          {remoteUsers.map(user => (
            <AutoLayout.Item key={user.uid}>
              <RemoteUser cover={fakeAvatar()} user={user} />
              <Label>{`${fakeName(user.uid)}{${user.uid}}`}</Label>
            </AutoLayout.Item>
          ))}
        </AutoLayout>
      </>
      <MediaControl
        calling={calling}
        cameraOn={cameraOn}
        micOn={micOn}
        setCalling={() => setCalling(a => !a)}
        setCamera={() => {
          setCamera(a => !a);
        }}
        setMic={() => {
          setMic(a => !a);
        }}
      />
    </Container>
  );
};

export default UseRemoteUsers;
