import styled from 'styled-components';

const RadioContainer = styled.div`
  [type='radio']:checked,
  [type='radio']:not(:checked) {
    position: absolute;
    left: -9999px;
  }
  [type='radio']:checked + label,
  [type='radio']:not(:checked) + label {
    position: relative;
    padding-left: 20px;
    cursor: pointer;
    line-height: 18px;
    color: #333333;
    font-weight: 600;
    font-size: 12px;
    line-height: 18px;
  }
  [type='radio']:checked + label:before,
  [type='radio']:not(:checked) + label:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 16px;
    height: 16px;
    border: 2px solid #333333;
    border-radius: 100%;
    background: #fff;
  }
  [type='radio']:checked + label:after,
  [type='radio']:not(:checked) + label:after {
    content: '';
    width: 10px;
    height: 10px;
    background: #333333;
    position: absolute;
    top: 3px;
    left: 3px;
    border-radius: 100%;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
  }
  [type='radio']:not(:checked) + label:after {
    opacity: 0;
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  [type='radio']:checked + label:after {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
`;

interface RadioProps {
  value: string;
  name: string;
  checked: boolean;
  handleChange: Function;
}

const Radio: React.FC<RadioProps> = props => {
  const { value, name, checked, handleChange } = props;

  return (
    <RadioContainer>
      <input type="radio" name={name} value={value} checked={checked} />
      <label htmlFor="test1" onClick={() => handleChange(value)}>
        Respuesta correcta
      </label>
    </RadioContainer>
  );
};

export default Radio;
