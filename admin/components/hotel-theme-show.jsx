import { Box, Label } from '@admin-bro/design-system';

function HotelThemeShow(props) {
    console.log(props)
    const { record, property } = props
    const value = record.params[property.path]
    return (
      <Box>
        <Label color="grey60" fontWeight="light">{property.label}</Label>
        {value.name}
      </Box>
    )    
}

export default HotelThemeShow