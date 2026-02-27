'use client';

import React, { useState } from 'react';
import styled from 'styled-components';

// ─── TIPOS ───────────────────────────────────────────────────────────────────

type Role = 'super_admin' | 'company_admin' | 'gerente' | 'tecnico' | 'recepcionista' | 'financeiro';
type Status = 'yes' | 'no' | 'own';

interface RouteRow {
  path: string;
  desc: string;
  group: string;
  access: Record<Role, Status>;
}

interface Issue {
  type: 'error' | 'warning' | 'info';
  title: string;
  body: string;
  fix: string;
  file: string;
}

// ─── DADOS ───────────────────────────────────────────────────────────────────

const ROLES: { id: Role; label: string; color: string; bg: string; border: string; scope: string; example: string[]; perms: string[]; missing: string }[] = [
  {
    id: 'super_admin', label: 'Super Admin', color: '#BBA188', bg: '#1e1a16', border: '#3d2e20',
    scope: 'Escopo: global — sem companyId',
    example: ['admin@sistema.com — Super Admin'],
    perms: ['* (tudo)'],
    missing: 'Não vê rotas de empresa (agenda, pacientes etc.)',
  },
  {
    id: 'company_admin', label: 'Company Admin', color: '#7ecb7e', bg: '#0f1a0f', border: '#1e3a1e',
    scope: 'Escopo: empresa vinculada (companyId obrigatório)',
    example: ['admin@empresa-a.com — Admin Empresa A', 'admin@empresa-b.com — Admin Empresa B'],
    perms: ['* (tudo da empresa)'],
    missing: 'Não acessa dados de outra empresa',
  },
  {
    id: 'gerente', label: 'Gerente', color: '#6fa3e0', bg: '#0f1520', border: '#1a2f4a',
    scope: 'Escopo: empresa vinculada',
    example: ['patricia.g@clinica.com — Patricia Gomes (emp. A)', 'joao.silva@empresa-b.com — João Silva (emp. B)'],
    perms: ['dashboard.read', 'profissionais.read/create/edit', 'agenda.*', 'pacientes.read/create/edit', 'prontuario.read/_own', 'historico.read/_own', 'fotos.*', 'reaplicacoes.*', 'procedimentos.*', 'consentimento.*', 'financeiro.read/create/edit', 'comissoes.*', 'estoque.*', 'lotes.*', 'relatorios.*'],
    missing: '⚠️ Não tem: configuracoes.read → não vê Configurações nem Termos de Uso',
  },
  {
    id: 'tecnico', label: 'Técnico', color: '#b47fe8', bg: '#130f1e', border: '#2a1f42',
    scope: 'Escopo: empresa vinculada · cargos: esteticista, biomedico, enfermeiro, dermatologista, fisioterapeuta',
    example: ['ana.lima@clinica.com — Ana Beatriz / esteticista (emp. A)', 'lucia.f@empresa-b.com — Lucia Ferreira / biomedico (emp. B)'],
    perms: ['dashboard.read', 'agenda.read_own/create/edit', 'pacientes.read/_own/create', 'prontuario.read_own/create/edit', 'historico.read_own', 'fotos.read_own/create', 'reaplicacoes.read_own/create', 'procedimentos.read', 'consentimento.read_own/create', 'estoque.read', 'comissoes.read_own'],
    missing: '⚠️ Não tem: financeiro.*, relatorios.*, profissionais.*, configuracoes.*',
  },
  {
    id: 'recepcionista', label: 'Recepcionista', color: '#e0c46f', bg: '#1a1608', border: '#3a300a',
    scope: 'Escopo: empresa vinculada · cargo: recepcionista',
    example: ['rafael.costa@clinica.com — Rafael Costa (emp. A)'],
    perms: ['dashboard.read', 'agenda.read/_own/create/edit', 'pacientes.read/create/edit', 'consentimento.read/create', 'estoque.read', 'procedimentos.read'],
    missing: '⚠️ Não tem: fotos, historico, prontuario, financeiro, comissoes, relatorios, profissionais',
  },
  {
    id: 'financeiro', label: 'Financeiro', color: '#6fd4c4', bg: '#0a1918', border: '#0f3330',
    scope: 'Escopo: empresa vinculada · cargo: financeiro',
    example: ['camila.rocha@clinica.com — Camila Rocha (emp. A)'],
    perms: ['dashboard.read', 'financeiro.read/create/edit/delete', 'comissoes.read/edit', 'agenda.read', 'pacientes.read', 'relatorios.financeiro/operacional'],
    missing: '⚠️ Não tem: fotos, historico, prontuario, estoque, lotes, profissionais, configuracoes',
  },
];

const ROUTES: RouteRow[] = [
  { path: '/empresas',           desc: 'Gestão de empresas',         group: 'SISTEMA — só super_admin',   access: { super_admin: 'yes', company_admin: 'no',  gerente: 'no',  tecnico: 'no',  recepcionista: 'no',  financeiro: 'no'  } },
  { path: '/finance (sistema)',  desc: 'Financeiro do sistema',      group: 'SISTEMA — só super_admin',   access: { super_admin: 'yes', company_admin: 'no',  gerente: 'no',  tecnico: 'no',  recepcionista: 'no',  financeiro: 'no'  } },
  { path: '/dashboard',          desc: 'dashboard.read',             group: 'CORE',                       access: { super_admin: 'no',  company_admin: 'yes', gerente: 'yes', tecnico: 'yes', recepcionista: 'yes', financeiro: 'yes' } },
  { path: '/agenda',             desc: 'agenda.read | agenda.read_own', group: 'CORE',                    access: { super_admin: 'no',  company_admin: 'yes', gerente: 'yes', tecnico: 'own', recepcionista: 'yes', financeiro: 'yes' } },
  { path: '/patients',           desc: 'pacientes.read | pacientes.read_own', group: 'CORE',              access: { super_admin: 'no',  company_admin: 'yes', gerente: 'yes', tecnico: 'yes', recepcionista: 'yes', financeiro: 'yes' } },
  { path: '/historico-paciente', desc: 'historico.read | historico.read_own', group: 'CLÍNICO',           access: { super_admin: 'no',  company_admin: 'yes', gerente: 'yes', tecnico: 'own', recepcionista: 'no',  financeiro: 'no'  } },
  { path: '/fotos',              desc: 'fotos.read | fotos.read_own', group: 'CLÍNICO',                   access: { super_admin: 'no',  company_admin: 'yes', gerente: 'yes', tecnico: 'own', recepcionista: 'no',  financeiro: 'no'  } },
  { path: '/reaplicacoes',       desc: 'reaplicacoes.read | reaplicacoes.read_own', group: 'CLÍNICO',     access: { super_admin: 'no',  company_admin: 'yes', gerente: 'yes', tecnico: 'own', recepcionista: 'no',  financeiro: 'no'  } },
  { path: '/procedures',         desc: 'procedimentos.read',         group: 'CLÍNICO',                    access: { super_admin: 'no',  company_admin: 'yes', gerente: 'yes', tecnico: 'yes', recepcionista: 'yes', financeiro: 'no'  } },
  { path: '/consentimento',      desc: 'consentimento.read | consentimento.read_own', group: 'CLÍNICO',   access: { super_admin: 'no',  company_admin: 'yes', gerente: 'yes', tecnico: 'own', recepcionista: 'yes', financeiro: 'no'  } },
  { path: '/profissionais',      desc: 'profissionais.read',         group: 'OPERACIONAL',                access: { super_admin: 'no',  company_admin: 'yes', gerente: 'yes', tecnico: 'no',  recepcionista: 'no',  financeiro: 'no'  } },
  { path: '/lotes',              desc: 'lotes.read',                 group: 'OPERACIONAL',                access: { super_admin: 'no',  company_admin: 'yes', gerente: 'yes', tecnico: 'no',  recepcionista: 'no',  financeiro: 'no'  } },
  { path: '/estoque',            desc: 'estoque.read',               group: 'OPERACIONAL',                access: { super_admin: 'no',  company_admin: 'yes', gerente: 'yes', tecnico: 'yes', recepcionista: 'yes', financeiro: 'no'  } },
  { path: '/finance (empresa)',  desc: 'financeiro.read',            group: 'OPERACIONAL',                access: { super_admin: 'no',  company_admin: 'yes', gerente: 'yes', tecnico: 'no',  recepcionista: 'no',  financeiro: 'yes' } },
  { path: '/comissoes',          desc: 'comissoes.read | comissoes.read_own', group: 'OPERACIONAL',       access: { super_admin: 'no',  company_admin: 'yes', gerente: 'yes', tecnico: 'own', recepcionista: 'no',  financeiro: 'yes' } },
  { path: '/reports',            desc: 'relatorios.financeiro',      group: 'OPERACIONAL',                access: { super_admin: 'no',  company_admin: 'yes', gerente: 'yes', tecnico: 'no',  recepcionista: 'no',  financeiro: 'yes' } },
  { path: '/termos',             desc: 'configuracoes.read',         group: 'OPERACIONAL',                access: { super_admin: 'no',  company_admin: 'yes', gerente: 'no',  tecnico: 'no',  recepcionista: 'no',  financeiro: 'no'  } },
  { path: '/settings',           desc: 'configuracoes.read',         group: 'OPERACIONAL',                access: { super_admin: 'no',  company_admin: 'yes', gerente: 'no',  tecnico: 'no',  recepcionista: 'no',  financeiro: 'no'  } },
];

const ISSUES: Issue[] = [
  {
    type: 'error',
    title: 'Rota /finance renderiza dois componentes diferentes',
    body: 'Existe finance-empresa/index.tsx E finance-superadmin/index.tsx, mas a página src/app/finance/page.tsx provavelmente importa só um. Se não houver um switch por role, super admin e usuários de empresa veem o mesmo componente.',
    fix: 'Adicionar: if (isSuperAdmin) return <FinanceSuperAdmin />; senão return <FinanceEmpresa />;',
    file: 'src/app/finance/page.tsx',
  },
  {
    type: 'error',
    title: 'Técnico acessa /patients sem filtro real de own',
    body: 'O técnico tem pacientes.read_own mas a navbar mostra /patients normalmente. Sem filtro no componente, ele pode ver todos os pacientes da empresa. O mesmo vale para agenda, historico, fotos, reaplicacoes, consentimento, comissoes.',
    fix: 'Filtrar por currentUser.id quando role === "tecnico" dentro do componente.',
    file: 'src/components/patients/index.tsx',
  },
  {
    type: 'warning',
    title: 'Gerente sem acesso a Configurações e Termos',
    body: 'O role gerente em src/types/auth.ts não possui configuracoes.read. Resultado: ele não enxerga /settings nem /termos na navbar. Se for intencional ok, mas parece esquecimento.',
    fix: "Adicionar 'configuracoes.read' ao array do gerente.",
    file: 'src/types/auth.ts',
  },
  {
    type: 'warning',
    title: 'Financeiro pode precisar de profissionais.read',
    body: 'O role financeiro pode ver /comissoes (comissões dos profissionais) mas não tem profissionais.read. Pode causar problema se a tela de comissões precisar listar profissionais para filtrar.',
    fix: "Adicionar 'profissionais.read' ao array do financeiro se o componente listar profissionais.",
    file: 'src/types/auth.ts',
  },
  {
    type: 'warning',
    title: 'Super Admin não vê rotas de empresa',
    body: 'Quando isSuperAdmin === true o navbar renderiza somente superAdminSections (Empresas + Financeiro Sistema). Se o super admin precisar navegar dentro de uma empresa, não consegue.',
    fix: 'Implementar modo impersonação ou seleção de empresa no AuthContext.',
    file: 'src/contexts/AuthContext.tsx',
  },
  {
    type: 'info',
    title: 'MOCK_COMPANIES e MOCK_USERS em produção',
    body: 'Em src/types/auth.ts os dados ainda são mocks hardcoded. usePaymentStatus() e AuthContext dependem desses mocks. Em produção precisa vir de API.',
    fix: 'Substituir MOCK_COMPANIES e MOCK_USERS por chamadas à API real dentro do AuthContext.',
    file: 'src/contexts/AuthContext.tsx',
  },
];

const FIX_FILES = [
  { file: 'src/types/auth.ts',                     change: "Adicionar 'configuracoes.read' ao gerente; revisar financeiro",                    priority: 'MÉDIA',  pColor: '#e0c46f', pBg: '#3a300a' },
  { file: 'src/app/finance/page.tsx',               change: 'Switch entre FinanceEmpresa e FinanceSuperAdmin por role',                         priority: 'ALTA',   pColor: '#e06f6f', pBg: '#3a1a1a' },
  { file: 'src/components/patients/index.tsx',      change: 'Filtrar por currentUser.id quando role = tecnico',                                 priority: 'ALTA',   pColor: '#e06f6f', pBg: '#3a1a1a' },
  { file: 'src/components/agenda/index.tsx',        change: 'Filtrar agenda própria para técnico',                                              priority: 'ALTA',   pColor: '#e06f6f', pBg: '#3a1a1a' },
  { file: 'src/components/comissoes/index.tsx',     change: 'Verificar se precisa de profissionais.read para o role financeiro',                priority: 'MÉDIA',  pColor: '#e0c46f', pBg: '#3a300a' },
  { file: 'src/contexts/AuthContext.tsx',           change: 'Substituir MOCK_USERS / MOCK_COMPANIES por API real',                              priority: 'FUTURO', pColor: '#6fb8e0', pBg: '#0a1318' },
];

// ─── ESTILOS ──────────────────────────────────────────────────────────────────

const Page = styled.div`
  background: #0d0d0f;
  min-height: 100vh;
  padding: 40px 32px;
  font-family: 'Inter', sans-serif;
  color: #e8e8ec;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 56px;
  h1 { font-size: 26px; font-weight: 700; color: #BBA188; margin-bottom: 6px; letter-spacing: -0.5px; }
  p  { font-size: 12px; color: #6b6b7a; font-family: monospace; }
`;

const SectionTitle = styled.div`
  font-size: 10px;
  font-family: monospace;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #6b6b7a;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid #222228;
`;

const ProfilesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
  margin-bottom: 56px;
`;

const ProfileCard = styled.div<{ $color: string; $bg: string; $border: string }>`
  background: ${p => p.$bg};
  border: 1px solid ${p => p.$border};
  border-radius: 12px;
  padding: 20px;
  position: relative;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: ${p => p.$color};
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
`;

const RoleDot = styled.div<{ $color: string }>`
  width: 9px; height: 9px;
  border-radius: 50%;
  background: ${p => p.$color};
  flex-shrink: 0;
`;

const ProfileName = styled.span<{ $color: string }>`
  font-size: 15px;
  font-weight: 600;
  color: ${p => p.$color};
`;

const Tag = styled.span<{ $color: string; $bg: string }>`
  font-size: 10px;
  font-family: monospace;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 4px;
  background: ${p => p.$bg};
  color: ${p => p.$color};
  margin-left: 4px;
`;

const ProfileScope = styled.div`
  font-size: 11px;
  font-family: monospace;
  color: #6b6b7a;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #222228;
`;

const ProfileExample = styled.div`
  font-size: 11px;
  color: #6b6b7a;
  margin-bottom: 12px;
  line-height: 1.7;
  strong { font-family: monospace; color: #e8e8ec; }
`;

const PermList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 12px;
`;

const PermBadge = styled.span<{ $full?: boolean }>`
  font-size: 10px;
  font-family: monospace;
  padding: 2px 6px;
  border-radius: 4px;
  background: ${p => p.$full ? 'rgba(62,207,142,0.1)' : 'rgba(255,255,255,0.05)'};
  color: ${p => p.$full ? '#3ecf8e' : '#6b6b7a'};
  border: 1px solid ${p => p.$full ? 'rgba(62,207,142,0.2)' : '#222228'};
`;

const MissingNote = styled.div`
  font-size: 11px;
  color: #6b6b7a;
  line-height: 1.6;
  strong { color: #e09c3e; }
`;

// Tabs
const TabRow = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const TabBtn = styled.button<{ $active: boolean; $color: string }>`
  padding: 6px 14px;
  border-radius: 6px;
  border: 1px solid ${p => p.$active ? p.$color : '#222228'};
  background: ${p => p.$active ? p.$color + '22' : 'transparent'};
  color: ${p => p.$active ? p.$color : '#6b6b7a'};
  font-size: 12px;
  font-family: monospace;
  cursor: pointer;
  transition: all 0.15s;
  &:hover { border-color: ${p => p.$color}; color: ${p => p.$color}; }
`;

// Matrix
const MatrixWrap = styled.div`
  overflow-x: auto;
  border-radius: 12px;
  border: 1px solid #222228;
  margin-bottom: 56px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 760px;
`;

const Th = styled.th<{ $color?: string }>`
  padding: 12px 10px;
  font-size: 10px;
  font-family: monospace;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-align: center;
  background: #141417;
  border-bottom: 1px solid #222228;
  white-space: nowrap;
  color: ${p => p.$color || '#6b6b7a'};
  &:first-child { text-align: left; width: 200px; }
`;

const GroupRow = styled.tr`
  td {
    padding: 7px 14px;
    font-size: 10px;
    font-family: monospace;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #6b6b7a;
    background: rgba(255,255,255,0.02);
    border-top: 1px solid #2a2a32;
  }
`;

const Tr = styled.tr`
  border-bottom: 1px solid #222228;
  &:last-child { border-bottom: none; }
  &:hover { background: rgba(255,255,255,0.02); }
`;

const TdRoute = styled.td`
  padding: 10px 12px;
  background: #141417;
  border-right: 1px solid #222228;
`;

const RoutePath = styled.div`font-size: 12px; font-family: monospace; color: #e8e8ec;`;
const RouteDesc = styled.div`font-size: 10px; color: #6b6b7a; margin-top: 2px;`;

const TdCheck = styled.td`text-align: center; vertical-align: middle; padding: 10px 6px;`;

const IconYes = styled.span`
  display: inline-flex; align-items: center; justify-content: center;
  width: 24px; height: 24px; border-radius: 6px;
  background: rgba(62,207,142,0.15); color: #3ecf8e; font-size: 13px;
`;

const IconOwn = styled.span`
  display: inline-flex; align-items: center; justify-content: center;
  width: 24px; height: 24px; border-radius: 6px;
  background: rgba(224,156,62,0.15); color: #e09c3e;
  font-size: 9px; font-family: monospace;
`;

const IconNo = styled.span`
  display: inline-flex; align-items: center; justify-content: center;
  width: 24px; height: 24px; border-radius: 6px;
  background: transparent; color: #3a3a48; font-size: 16px;
`;

// Issues
const IssuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 16px;
  margin-bottom: 56px;
`;

const IssueCard = styled.div<{ $type: 'error' | 'warning' | 'info' }>`
  border-radius: 10px;
  border: 1px solid ${p => p.$type === 'error' ? '#3a1a1a' : p.$type === 'warning' ? '#3a300a' : '#0f2535'};
  background: ${p => p.$type === 'error' ? '#1a0d0d' : p.$type === 'warning' ? '#1a1608' : '#0a1318'};
  padding: 18px;
`;

const IssueHeader = styled.div`display: flex; align-items: center; gap: 10px; margin-bottom: 10px;`;
const IssueIcon = styled.span`font-size: 16px;`;
const IssueTitle = styled.span<{ $type: 'error' | 'warning' | 'info' }>`
  font-size: 13px; font-weight: 600;
  color: ${p => p.$type === 'error' ? '#e06f6f' : p.$type === 'warning' ? '#e0c46f' : '#6fb8e0'};
`;

const IssueBody = styled.div`
  font-size: 11px; color: #6b6b7a; line-height: 1.7;
  code { font-family: monospace; background: rgba(255,255,255,0.07); padding: 1px 5px; border-radius: 3px; font-size: 10px; color: #e8e8ec; }
`;

const FixBlock = styled.div`
  margin-top: 12px; padding: 10px 12px;
  background: rgba(255,255,255,0.03);
  border-radius: 6px; border-left: 2px solid #BBA188;
`;

const FixLabel = styled.div`
  font-size: 9px; font-family: monospace; letter-spacing: 2px;
  text-transform: uppercase; color: #BBA188; margin-bottom: 5px;
`;

const FixBody = styled.div`
  font-size: 11px; color: #6b6b7a; line-height: 1.6;
  code { font-family: monospace; background: rgba(255,255,255,0.07); padding: 1px 5px; border-radius: 3px; font-size: 10px; color: #e8e8ec; }
`;

const Legend = styled.div`
  display: flex; gap: 20px; align-items: center; flex-wrap: wrap;
  padding: 12px 16px;
  background: #141417; border: 1px solid #222228; border-radius: 10px;
  margin-bottom: 20px;
`;

const LegendItem = styled.div`
  display: flex; align-items: center; gap: 8px;
  font-size: 11px; color: #6b6b7a;
`;

// ─── HELPERS ──────────────────────────────────────────────────────────────────

const ROLE_ORDER: Role[] = ['super_admin', 'company_admin', 'gerente', 'tecnico', 'recepcionista', 'financeiro'];

function getGroups(rows: RouteRow[]) {
  const groups: string[] = [];
  rows.forEach(r => { if (!groups.includes(r.group)) groups.push(r.group); });
  return groups;
}

function AccessIcon({ status }: { status: Status }) {
  if (status === 'yes') return <IconYes>✓</IconYes>;
  if (status === 'own') return <IconOwn>own</IconOwn>;
  return <IconNo>—</IconNo>;
}

// ─── COMPONENTE ───────────────────────────────────────────────────────────────

export default function DocsPermissoesPage() {
  const [activeRole, setActiveRole] = useState<Role | 'all'>('all');

  const visibleRoles = activeRole === 'all' ? ROLE_ORDER : [activeRole];
  const groups = getGroups(ROUTES);

  const roleInfo = (id: Role) => ROLES.find(r => r.id === id)!;

  return (
    <Page>
      <PageHeader>
        <h1>🔐 Debug de Permissões</h1>
        <p>src/types/auth.ts · src/components/navbar/index.tsx · src/components/ui/hooks/usePermissions.ts</p>
      </PageHeader>

      {/* ── 01 PERFIS ── */}
      <SectionTitle>01 — Perfis de Acesso</SectionTitle>
      <ProfilesGrid>
        {ROLES.map(r => (
          <ProfileCard key={r.id} $color={r.color} $bg={r.bg} $border={r.border}>
            <ProfileHeader>
              <RoleDot $color={r.color} />
              <ProfileName $color={r.color}>{r.label}</ProfileName>
              <Tag $color={r.color} $bg={r.border}>
                {r.id === 'super_admin' ? 'SISTEMA' : 'EMPRESA'}
              </Tag>
            </ProfileHeader>
            <ProfileScope>{r.scope}</ProfileScope>
            <ProfileExample>
              {r.example.map(e => (
                <div key={e}>Exemplo: <strong>{e}</strong></div>
              ))}
            </ProfileExample>
            <PermList>
              {r.perms.map(p => (
                <PermBadge key={p} $full={p === '* (tudo)' || p === '* (tudo da empresa)'}>{p}</PermBadge>
              ))}
            </PermList>
            <MissingNote dangerouslySetInnerHTML={{ __html: r.missing.replace(/⚠️ Não tem: (.+)/, '⚠️ Não tem: <strong>$1</strong>') }} />
          </ProfileCard>
        ))}
      </ProfilesGrid>

      {/* ── 02 MATRIZ ── */}
      <SectionTitle>02 — O que cada perfil VÊ na Navbar</SectionTitle>

      <Legend>
        <LegendItem><IconYes>✓</IconYes> Vê o item</LegendItem>
        <LegendItem><IconOwn>own</IconOwn> Vê (somente próprio)</LegendItem>
        <LegendItem><IconNo>—</IconNo> Não aparece no menu</LegendItem>
      </Legend>

      <TabRow>
        <TabBtn $active={activeRole === 'all'} $color="#BBA188" onClick={() => setActiveRole('all')}>Todos</TabBtn>
        {ROLES.map(r => (
          <TabBtn key={r.id} $active={activeRole === r.id} $color={r.color} onClick={() => setActiveRole(r.id)}>
            {r.label}
          </TabBtn>
        ))}
      </TabRow>

      <MatrixWrap>
        <Table>
          <thead>
            <tr>
              <Th style={{ textAlign: 'left' }}>Rota / Página</Th>
              {visibleRoles.map(id => (
                <Th key={id} $color={roleInfo(id).color}>{roleInfo(id).label}</Th>
              ))}
            </tr>
          </thead>
          <tbody>
            {groups.map(group => (
              <React.Fragment key={group}>
                <GroupRow><td colSpan={visibleRoles.length + 1}>{group}</td></GroupRow>
                {ROUTES.filter(r => r.group === group).map(row => (
                  <Tr key={row.path}>
                    <TdRoute>
                      <RoutePath>{row.path}</RoutePath>
                      <RouteDesc>{row.desc}</RouteDesc>
                    </TdRoute>
                    {visibleRoles.map(id => (
                      <TdCheck key={id}><AccessIcon status={row.access[id]} /></TdCheck>
                    ))}
                  </Tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      </MatrixWrap>

      {/* ── 03 PROBLEMAS ── */}
      <SectionTitle>03 — Problemas Encontrados &amp; Correções</SectionTitle>
      <IssuesGrid>
        {ISSUES.map((issue, i) => (
          <IssueCard key={i} $type={issue.type}>
            <IssueHeader>
              <IssueIcon>{issue.type === 'error' ? '🚨' : issue.type === 'warning' ? '⚠️' : 'ℹ️'}</IssueIcon>
              <IssueTitle $type={issue.type}>{issue.title}</IssueTitle>
            </IssueHeader>
            <IssueBody>{issue.body}</IssueBody>
            <FixBlock>
              <FixLabel>CORREÇÃO</FixLabel>
              <FixBody>
                <code>{issue.file}</code><br />{issue.fix}
              </FixBody>
            </FixBlock>
          </IssueCard>
        ))}
      </IssuesGrid>

      {/* ── 04 ARQUIVOS ── */}
      <SectionTitle>04 — Arquivos para Alterar</SectionTitle>
      <MatrixWrap>
        <Table>
          <thead>
            <tr>
              <Th style={{ textAlign: 'left' }}>Arquivo</Th>
              <Th style={{ textAlign: 'left' }}>Mudança</Th>
              <Th style={{ textAlign: 'left' }}>Prioridade</Th>
            </tr>
          </thead>
          <tbody>
            {FIX_FILES.map((f, i) => (
              <Tr key={i}>
                <TdRoute><RoutePath>{f.file}</RoutePath></TdRoute>
                <td style={{ padding: '10px 12px', fontSize: 12, color: '#6b6b7a' }}>{f.change}</td>
                <td style={{ padding: '10px 12px' }}>
                  <Tag $color={f.pColor} $bg={f.pBg}>{f.priority}</Tag>
                </td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </MatrixWrap>
    </Page>
  );
}