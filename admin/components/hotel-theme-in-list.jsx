function HotelThemeInList(props) {
    const { record, property } = props
    const value = record.params[property.path]
    return <>{value.name}</>;
}

export default HotelThemeInList