import { render, screen, fireEvent } from '@testing-library/react';
import Input from './Input';

describe('Input component', () => {
  it('renders with default props', () => {
    const onChange = jest.fn();
    render(<Input value="" onChange={onChange} />);
    
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('');
    expect(inputElement).toHaveClass('px-3 py-2 border border-gray-300 rounded');
  });

  it('renders with custom placeholder and className', () => {
    const onChange = jest.fn();
    render(
      <Input
        value=""
        onChange={onChange}
        placeholder="Enter text"
        className="custom-class"
      />
    );
    
    const inputElement = screen.getByPlaceholderText('Enter text');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveClass('custom-class');
  });

  it('updates value on change', () => {
    const onChange = jest.fn();
    render(<Input value="" onChange={onChange} />);
    
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'New Value' } });
    
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(expect.any(Object));
  });
});