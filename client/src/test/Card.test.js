import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Card from "../Components/Card/Card";
import { BrowserRouter} from 'react-router-dom';

test('renders content', () => {
    const data = {
        name: 'la vieja',
        image: '../resources/deer-art.jpg',
        rating: 3.5,
        id: 222,
        genres: ['action', 'shooter'], 
        released: "2022-05-04"
    }

    const component = render(
      <BrowserRouter>
        <Card
          name={data.name}
          image={data.image}
          rating={data.rating}
          id={data.id}
          genres={data.genres}
          released={data.released}
        />
      </BrowserRouter>
    );
     component.getByAltText(data.name)
    expect(component.container).toHaveTextContent(data.name)
    expect(component.container).toHaveTextContent(data.genres.join(" | "))
    expect(component.container).toHaveTextContent('4/5/2022')
})

