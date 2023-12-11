import { CameraDevice, useCameraDevices } from 'react-native-vision-camera'
import { useCallback, useMemo } from 'react'
import useUserLocalStorage from './useLocalStorage'

export function usePreferredCameraDevice(): [CameraDevice | undefined, (device: CameraDevice) => void] {
    const { userSetting, setUserSetting } = useUserLocalStorage().setting;

  const set = useCallback(
    (device: CameraDevice) => {
      setUserSetting({ ...userSetting,  cameraDeviceId: device.id })
    },
    [setUserSetting],
  )

  const devices = useCameraDevices()
  const device = useMemo(() => devices.find((d: CameraDevice) => d.id === userSetting.cameraDeviceId), [devices, userSetting.cameraDeviceId])

  return [device, set]
}