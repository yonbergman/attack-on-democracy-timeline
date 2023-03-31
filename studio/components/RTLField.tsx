import { Stack, Card, Text } from '@sanity/ui'

export function CustomField(props) {
  const { description, title, ...restProps } = props
  return (
    <Card>
      <Stack space={3} marginBottom={3}>
        <Text size={1} weight="bold" dir='rtl'>
          {title}
        </Text>
        {description && (
          <Text size={1} dir='rtl'>
            {description}
          </Text>
        )}
      </Stack>
      {props.renderDefault(restProps)}
    </Card>
  )
}