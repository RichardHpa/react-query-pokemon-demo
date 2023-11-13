import { render, screen, fireEvent, prettyDOM, logRoles, act } from '@testing-library/react';

import { ChangeEvent, SetStateAction, useState } from 'react';

const MyComponent = () => {
  const [classInput, setClassInput] = useState({ name: 'test', type: 'test' });
  function updateInput(
    event: ChangeEvent<HTMLInputElement>,
    key: string,
    updateFunc: {
      (value: SetStateAction<{ name: string; type: string }>): void;
      (value: SetStateAction<{ name: string; type: string }>): void;
      (arg0: (prev: any) => any): void;
    }
  ) {
    updateFunc((prev: any) => {
      return { ...prev, [key]: event.target.value.trim() };
    });
  }
  return (
    <div>
      <label htmlFor="name_class input">Name</label>
      <label htmlFor="type input">Type</label>
      <input
        type="string"
        onChange={event => updateInput(event, 'name', setClassInput)}
        value={classInput.name}
        id="name_class input"
      />
      <input
        type="string"
        onChange={event => updateInput(event, 'type', setClassInput)}
        value={classInput.type}
        id="type input"
      />
    </div>
  );
};

describe('testing change', () => {
  test('test', () => {
    render(<MyComponent />);
    const nameInput = screen.getAllByRole('textbox', { name: 'Name' })[0];
    expect(nameInput).toBeInTheDocument();
    expect(nameInput).toHaveValue('test');

    const classInput = screen.getByRole('textbox', {
      name: 'Type',
    });
    expect(classInput).toBeInTheDocument();
    expect(classInput).toHaveValue('test');

    fireEvent.change(nameInput, { target: { value: 'UwU' } });
    fireEvent.change(classInput, { target: { value: 'kekw' } });
    expect(nameInput).toHaveValue('UwU');
    expect(classInput).toHaveValue('kekw');
  });
});
