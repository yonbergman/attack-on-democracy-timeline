import { Stack } from '@sanity/ui'

export function RTLStringInput(props) {
  return (
    <Stack space={3} dir='rtl'>
      {props.renderDefault(props)}
    </Stack>
  )
}