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

export const ImpersonateBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(59,130,246,0.1);
  border: 1.5px solid rgba(59,130,246,0.3);
  border-radius: 12px;
  padding: 12px 18px;
  margin-bottom: 20px;
  gap: 12px;
  flex-wrap: wrap;
`;

export const ImpersonateText = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.83rem;
  color: #3b82f6;
  font-weight: 500;
  svg { flex-shrink: 0; }
`;

export const ImpersonateBtn = styled.button`
  padding: 7px 14px;
  border-radius: 8px;
  border: 1.5px solid rgba(59,130,246,0.4);
  background: white;
  font-size: 0.78rem;
  font-weight: 600;
  color: #3b82f6;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
  &:hover { background: rgba(59,130,246,0.08); }
`;

export const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-bottom: 24px;
  @media (max-width: 768px) { grid-template-columns: repeat(2, 1fr); }
`;

export const StatBox = styled.div<{ $alert?: boolean }>`
  background: white;
  border-radius: 14px;
  padding: 18px 20px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  border-left: 4px solid ${p => p.$alert ? '#e74c3c' : '#BBA188'};
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
  flex-wrap: wrap;
`;

export const TabBtn = styled.button<{ $active: boolean; $small?: boolean }>`
  padding: ${p => p.$small ? '7px 14px' : '9px 20px'};
  border-radius: 9px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: ${p => p.$small ? '0.78rem' : '0.85rem'};
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
  min-width: 130px;
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

export const TableWrapper = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Thead = styled.thead`
  background: #fdf9f5;
`;

export const Th = styled.th`
  padding: 12px 16px;
  text-align: left;
  font-size: 0.7rem;
  font-weight: 700;
  color: #BBA188;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
`;

export const Tbody = styled.tbody``;

export const Tr = styled.tr`
  border-top: 1px solid #f8f8f8;
  transition: background 0.15s;
  &:hover { background: rgba(187,161,136,0.03); }
`;

export const Td = styled.td`
  padding: 13px 16px;
  font-size: 0.83rem;
  color: #333;
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
  width: 30px;
  height: 30px;
  border-radius: 8px;
  border: 1.5px solid #eee;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #888;
  transition: all 0.15s;
  &:hover { border-color: #BBA188; color: #BBA188; }
`;

export const Btn = styled.button<{ $variant?: string; $size?: string; $full?: boolean }>`
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
  width: ${p => p.$full ? '100%' : 'auto'};
  justify-content: center;
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

export const DetailPanel = styled.div`
  width: 320px;
  flex-shrink: 0;
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  overflow: hidden;
  align-self: flex-start;
  @media (max-width: 1024px) { display: none; }
`;

export const DetailHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 20px 20px 14px;
  border-bottom: 1px solid #f5f5f5;
`;

export const DetailClose = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 8px;
  border: 1.5px solid #eee;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #888;
  transition: all 0.15s;
  flex-shrink: 0;
  &:hover { border-color: #e74c3c; color: #e74c3c; }
`;

export const DetailTitle = styled.div`
  font-size: 0.9rem;
  font-weight: 700;
  color: #1a1a1a;
`;

export const DetailSub = styled.div`
  font-size: 0.72rem;
  color: #aaa;
  margin-top: 2px;
`;

export const DetailSection = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid #f5f5f5;
`;

export const DetailSectionTitle = styled.div`
  font-size: 0.7rem;
  font-weight: 700;
  color: #BBA188;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
  gap: 8px;
`;

export const InfoLabel = styled.div`
  font-size: 0.75rem;
  color: #aaa;
  font-weight: 500;
  flex-shrink: 0;
`;

export const InfoValue = styled.div`
  font-size: 0.78rem;
  color: #333;
  font-weight: 600;
  text-align: right;
`;

export const LogList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const LogItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
`;

export const LogDot = styled.div<{ $tipo: string }>`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  margin-top: 4px;
  flex-shrink: 0;
  background: ${p =>
    p.$tipo === 'danger'  ? '#e74c3c' :
    p.$tipo === 'warning' ? '#d68a00' :
    p.$tipo === 'success' ? '#8a7560' : '#3b82f6'};
`;

export const LogText = styled.div`
  flex: 1;
  font-size: 0.75rem;
  color: #555;
  line-height: 1.4;
`;

export const LogTime = styled.div`
  font-size: 0.68rem;
  color: #ccc;
  white-space: nowrap;
  flex-shrink: 0;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 48px;
  color: #bbb;
  font-size: 0.85rem;
  background: white;
  border-radius: 16px;
`;

export const TicketCard = styled.div`
  background: white;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  padding: 20px 22px;
`;

export const TicketHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 6px;
`;

export const TicketTitle = styled.div`
  font-size: 0.9rem;
  font-weight: 700;
  color: #1a1a1a;
  flex: 1;
`;

export const TicketMeta = styled.div`
  font-size: 0.75rem;
  color: #aaa;
  margin-bottom: 10px;
`;

export const TicketBody = styled.div`
  font-size: 0.82rem;
  color: #555;
  line-height: 1.5;
`;

export const TicketBadge = styled.span<{ $color: string }>`
  font-size: 0.68rem;
  font-weight: 700;
  color: ${p => p.$color};
  background: ${p => p.$color}18;
  padding: 2px 8px;
  border-radius: 12px;
  white-space: nowrap;
`;