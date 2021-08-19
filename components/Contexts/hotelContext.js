import React, { useState } from 'react';

export const HotelStyleContext = React.createContext({
    style: {
        logo: "https://enzosystems.com/wp-content/uploads/2018/09/enzosystems-logo.png",
        backgroundImage: "https://enzosystems.com/wp-content/uploads/2018/10/Enzosystems_Header_FrontPage.jpg",
        fontFamily: "'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif' "
    },
    setStyle: (newTheme) => this.style = newTheme
  });

  
const HotelStyleContextProvider = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [hotel, setHotel] = useState(null);
    const [style, setStyle] = useState(null);
   
    return (
        <HotelStyleContext.Provider
            value={{
                isLoading,
                setIsLoading,
                style,
                setStyle,
                hotel,
                setHotel
            }}
        >
            {props.children}
        </HotelStyleContext.Provider>
    );
};

export default HotelStyleContextProvider;