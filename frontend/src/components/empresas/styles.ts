import styled from 'styled-components';

export const Container = styled.div`
  padding: 32px 32px 48px;
  background: #f5f5f5;
  max-width: 1400px;
  margin: 0 auto;
  @media (max-width: 768px) { padding: 16px; }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
  gap: 16px;
  flex-wrap: wrap;
`;

export const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
  @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 600px)  { grid-template-columns: 1fr; }
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 20px;
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
  padding: 10px 14px 10px 40px;
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
  flex-wrap: wrap;
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

export const ClearFilterBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 9px 12px;
  border: 1.5px solid #eee;
  border-radius: 10px;
  background: white;
  font-size: 0.78rem;
  color: #e74c3c;
  cursor: pointer;
  &:hover { border-color: #e74c3c; }
`;

export const TableWrapper = styled.div`
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Thead = styled.thead`
  background: #f9f5f0;
`;

export const Th = styled.th<{ $width?: string; $center?: boolean }>`
  padding: 12px 14px;
  text-align: ${p => p.$center ? 'center' : 'left'};
  font-size: 0.72rem;
  font-weight: 700;
  color: #BBA188;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
  width: ${p => p.$width || 'auto'};
`;

export const Tbody = styled.tbody``;

export const Tr = styled.tr`
  border-top: 1px solid #f5f5f5;
  transition: background 0.15s;
  &:hover { background: rgba(187,161,136,0.04); }
`;

export const Td = styled.td<{ $muted?: boolean; $center?: boolean; $bold?: boolean }>`
  padding: 13px 14px;
  font-size: 0.83rem;
  color: ${p => p.$muted ? '#888' : '#1a1a1a'};
  text-align: ${p => p.$center ? 'center' : 'left'};
  font-weight: ${p => p.$bold ? 700 : 400};
  vertical-align: middle;
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

export const ActionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const IconBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border: 1.5px solid #eee;
  border-radius: 8px;
  background: white;
  color: #888;
  cursor: pointer;
  transition: all 0.15s;
  &:hover { border-color: #BBA188; color: #BBA188; background: rgba(187,161,136,0.07); }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 24px;
  color: #ccc;
  gap: 12px;
  h3 { margin: 0; font-size: 1rem; color: #999; }
  p  { margin: 0; font-size: 0.83rem; }
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  @media (max-width: 600px) { grid-template-columns: 1fr; }
`;

export const SectionLabel = styled.p`
  font-size: 0.7rem;
  font-weight: 700;
  color: #BBA188;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 14px;
`;

export const EmpresaInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const EmpresaNome = styled.div`
  font-weight: 600;
  font-size: 0.85rem;
  color: #1a1a1a;
`;

export const EmpresaEmail = styled.div`
  font-size: 0.75rem;
  color: #aaa;
`;

export const AvatarEmpresa = styled.div<{ $color: string }>`
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: ${p => p.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  color: white;
  flex-shrink: 0;
`;

export const WizardSteps = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 0;
  margin-bottom: 28px;
  padding-bottom: 24px;
  border-bottom: 1px solid #f0ebe4;
`;

export const WizardStep = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex: 1;
`;

export const WizardStepLine = styled.div<{ $done?: boolean }>`
  position: absolute;
  top: 12px;
  right: 50%;
  width: 100%;
  height: 2px;
  background: ${p => p.$done ? '#BBA188' : '#eee'};
  transition: background 0.3s;
`;

export const WizardStepCircle = styled.div<{ $done?: boolean; $current?: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.72rem;
  font-weight: 700;
  position: relative;
  z-index: 1;
  background: ${p => p.$done ? '#BBA188' : p.$current ? '#BBA188' : '#eee'};
  color: ${p => p.$done || p.$current ? 'white' : '#bbb'};
  transition: all 0.3s;
`;

export const WizardStepLabel = styled.div<{ $current?: boolean }>`
  font-size: 0.65rem;
  margin-top: 6px;
  color: ${p => p.$current ? '#BBA188' : '#bbb'};
  font-weight: ${p => p.$current ? 700 : 400};
  text-align: center;
  white-space: nowrap;
`;

export const StepSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const WizardNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
`;

export const DetailSection = styled.div`
  margin-top: 20px;
`;

export const DetailSectionTitle = styled.div`
  font-size: 0.7rem;
  font-weight: 700;
  color: #BBA188;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #f0ebe4;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  @media (max-width: 600px) { grid-template-columns: 1fr; }
`;

export const InfoItem = styled.div``;

export const InfoLabel = styled.div`
  font-size: 0.7rem;
  color: #bbb;
  margin-bottom: 3px;
`;

export const InfoValue = styled.div`
  font-size: 0.85rem;
  color: #1a1a1a;
  font-weight: 500;
`;

export const TabRow = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 20px;
  background: #f5f5f5;
  border-radius: 10px;
  padding: 4px;
  width: fit-content;
`;

export const Tab = styled.button<{ $active?: boolean }>`
  padding: 8px 20px;
  border-radius: 8px;
  border: none;
  font-size: 0.83rem;
  font-weight: ${p => p.$active ? 700 : 400};
  color: ${p => p.$active ? '#1a1a1a' : '#888'};
  background: ${p => p.$active ? 'white' : 'transparent'};
  cursor: pointer;
  transition: all 0.15s;
  box-shadow: ${p => p.$active ? '0 1px 4px rgba(0,0,0,0.08)' : 'none'};
  white-space: nowrap;
`;

export const InfoBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  background: rgba(59,130,246,0.07);
  border: 1.5px solid rgba(59,130,246,0.2);
  border-radius: 10px;
  padding: 12px 16px;
  font-size: 0.8rem;
  color: #3b82f6;
  margin-bottom: 20px;
  line-height: 1.4;
  svg { flex-shrink: 0; margin-top: 1px; }
  strong { font-weight: 700; }
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