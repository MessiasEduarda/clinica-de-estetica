import styled, { keyframes } from 'styled-components';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const Container = styled.div`
  padding: 40px;
  width: 100%;
  min-height: 100vh;
  background: #f5f5f5;
  box-sizing: border-box;
  animation: ${fadeUp} 0.35s ease;
  @media (max-width: 1024px) { padding: 72px 20px 24px; }
  @media (max-width: 768px)  { padding: 72px 14px 20px; }
`;

export const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 12px;
`;

export const Title = styled.h1`
  font-size: 1.75rem;
  font-family: var(--font-cabourg-bold), 'Cabourg', serif;
  color: #BBA188;
  margin: 0;
  font-weight: 700;
`;

export const Subtitle = styled.p`
  font-size: 0.85rem;
  color: #aaa;
  margin: 5px 0 0;
`;

export const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-bottom: 24px;
  @media (max-width: 768px) { grid-template-columns: repeat(2, 1fr); }
`;

export const StatBox = styled.div<{ $highlight?: boolean }>`
  background: white;
  border-radius: 14px;
  padding: 18px 20px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  border-left: 4px solid ${p => p.$highlight ? '#BBA188' : '#e8e0d8'};
`;

export const StatBoxValue = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  color: #1a1a1a;
  font-family: var(--font-cabourg-bold), serif;
`;

export const StatBoxLabel = styled.div`
  font-size: 0.72rem;
  color: #aaa;
  font-weight: 600;
  margin-top: 2px;
  text-transform: uppercase;
  letter-spacing: 0.4px;
`;

export const TabRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 20px;
`;

export const TabBtn = styled.button<{ $active: boolean }>`
  padding: 9px 20px;
  border-radius: 9px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.85rem;
  transition: all 0.2s;
  background: ${p => p.$active ? '#BBA188' : 'transparent'};
  color: ${p => p.$active ? 'white' : '#888'};
  &:hover { background: ${p => p.$active ? '#BBA188' : 'rgba(187,161,136,0.1)'}; color: ${p => p.$active ? 'white' : '#BBA188'}; }
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

export const SearchBarWrapper = styled.div`
  position: relative;
  flex: 1;
  min-width: 220px;
  max-width: 360px;
`;

export const SearchIconWrap = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #bbb;
  pointer-events: none;
`;

export const SearchInputStyled = styled.input`
  width: 100%;
  padding: 10px 14px 10px 38px;
  border: 1.5px solid #eee;
  border-radius: 10px;
  font-size: 0.875rem;
  color: #333;
  background: white;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s;
  &:focus { border-color: #BBA188; }
  &::placeholder { color: #bbb; }
`;

export const FilterRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const DropdownWrapper = styled.div`
  position: relative;
`;

export const DropdownBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 9px 14px;
  border: 1.5px solid #eee;
  border-radius: 10px;
  background: white;
  font-size: 0.83rem;
  color: #555;
  cursor: pointer;
  white-space: nowrap;
  transition: border-color 0.2s;
  &:hover { border-color: #BBA188; }
`;

export const DropdownList = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  background: white;
  border: 1.5px solid #eee;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
  z-index: 100;
  min-width: 140px;
  overflow: hidden;
`;

export const DropdownItem = styled.div<{ $active?: boolean }>`
  padding: 9px 14px;
  font-size: 0.83rem;
  color: ${p => p.$active ? '#BBA188' : '#555'};
  background: ${p => p.$active ? 'rgba(187,161,136,0.07)' : 'white'};
  cursor: pointer;
  font-weight: ${p => p.$active ? 600 : 400};
  &:hover { background: rgba(187,161,136,0.07); }
`;

export const Btn = styled.button<{ $variant?: string; $size?: string }>`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: ${p => p.$size === 'sm' ? '8px 14px' : '10px 20px'};
  border-radius: 10px;
  font-size: ${p => p.$size === 'sm' ? '0.78rem' : '0.83rem'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: 1.5px solid transparent;
  ${p => p.$variant === 'primary' ? `
    background: #1a1a1a;
    color: white;
    &:hover { background: #333; }
  ` : `
    background: white;
    color: #555;
    border-color: #eee;
    &:hover { border-color: #BBA188; color: #BBA188; }
  `}
`;

export const FormCard = styled.div`
  background: white;
  border-radius: 18px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.07);
  overflow: hidden;
`;

export const FormSection = styled.div`
  padding: 28px 32px;
  @media (max-width: 600px) { padding: 20px 16px; }
`;

export const FormSectionTitle = styled.div`
  font-size: 0.9rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1.5px solid #f5f5f5;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`;

export const FieldWrapper = styled.div<{ $span2?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 6px;
  grid-column: ${p => p.$span2 ? 'span 2' : 'span 1'};
`;

export const Label = styled.label`
  font-size: 0.78rem;
  font-weight: 600;
  color: #555;
`;

export const InputField = styled.input<{ $error?: boolean }>`
  padding: 10px 13px;
  border: 1.5px solid ${p => p.$error ? '#e74c3c' : '#eee'};
  border-radius: 10px;
  font-size: 0.875rem;
  color: #1a1a1a;
  background: white;
  outline: none;
  transition: border-color 0.2s;
  &:focus { border-color: #BBA188; }
  &::placeholder { color: #ccc; }
`;

export const SelectField = styled.select`
  padding: 10px 13px;
  border: 1.5px solid #eee;
  border-radius: 10px;
  font-size: 0.875rem;
  color: #1a1a1a;
  background: white;
  outline: none;
  transition: border-color 0.2s;
  cursor: pointer;
  &:focus { border-color: #BBA188; }
`;

export const TextareaField = styled.textarea<{ $error?: boolean }>`
  padding: 12px 13px;
  border: 1.5px solid ${p => p.$error ? '#e74c3c' : '#eee'};
  border-radius: 10px;
  font-size: 0.875rem;
  color: #1a1a1a;
  background: white;
  outline: none;
  resize: vertical;
  font-family: inherit;
  line-height: 1.5;
  transition: border-color 0.2s;
  &:focus { border-color: #BBA188; }
  &::placeholder { color: #ccc; }
`;

export const ErrorMsg = styled.div`
  font-size: 0.72rem;
  color: #e74c3c;
  font-weight: 500;
`;

export const CheckboxRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  user-select: none;
`;

export const CheckboxBox = styled.div<{ $checked: boolean }>`
  width: 18px;
  height: 18px;
  border-radius: 5px;
  border: 2px solid ${p => p.$checked ? '#BBA188' : '#ddd'};
  background: ${p => p.$checked ? '#BBA188' : 'white'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s;
`;

export const CheckboxLabel = styled.div`
  font-size: 0.83rem;
  color: #444;
  font-weight: 500;
`;

export const BtnRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 32px;
  border-top: 1.5px solid #f5f5f5;
  @media (max-width: 600px) { padding: 16px; }
`;

export const ComunicadoCard = styled.div`
  background: white;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  padding: 20px 22px;
`;

export const ComunicadoHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 6px;
`;

export const ComunicadoTitle = styled.div`
  font-size: 0.92rem;
  font-weight: 700;
  color: #1a1a1a;
  flex: 1;
`;

export const ComunicadoMeta = styled.div`
  font-size: 0.75rem;
  color: #aaa;
  margin-bottom: 10px;
`;

export const ComunicadoBody = styled.div`
  font-size: 0.83rem;
  color: #555;
  line-height: 1.55;
`;

export const ComunicadoFooter = styled.div`
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px solid #f5f5f5;
`;

export const Badge = styled.span<{ $bg: string; $color: string }>`
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 0.72rem;
  font-weight: 700;
  background: ${p => p.$bg};
  color: ${p => p.$color};
  white-space: nowrap;
`;

export const BadgeTipo = styled(Badge)``;
export const BadgeStatus = styled(Badge)``;

export const EmpresaChipList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const EmpresaChip = styled.div<{ $selected: boolean }>`
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: 1.5px solid ${p => p.$selected ? '#BBA188' : '#eee'};
  background: ${p => p.$selected ? 'rgba(187,161,136,0.12)' : 'white'};
  color: ${p => p.$selected ? '#8a7560' : '#666'};
  &:hover { border-color: #BBA188; color: #8a7560; }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 48px;
  color: #bbb;
  font-size: 0.85rem;
  background: white;
  border-radius: 16px;
`;

export const PreviewBox = styled.div<{ $tipo: string }>`
  border-radius: 12px;
  padding: 18px 20px;
  background: ${p =>
    p.$tipo === 'manutencao' ? 'rgba(107,114,128,0.06)' :
    p.$tipo === 'novidade'   ? 'rgba(59,130,246,0.06)'  :
    p.$tipo === 'alerta'     ? 'rgba(214,138,0,0.06)'   :
    'rgba(231,76,60,0.06)'};
  border: 1.5px solid ${p =>
    p.$tipo === 'manutencao' ? 'rgba(107,114,128,0.2)' :
    p.$tipo === 'novidade'   ? 'rgba(59,130,246,0.2)'  :
    p.$tipo === 'alerta'     ? 'rgba(214,138,0,0.2)'   :
    'rgba(231,76,60,0.2)'};
`;

export const PreviewTitle = styled.div`
  font-size: 0.9rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 8px;
`;

export const PreviewBody = styled.div`
  font-size: 0.82rem;
  color: #555;
  line-height: 1.55;
`;