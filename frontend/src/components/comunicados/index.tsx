'use client';

import { useState } from 'react';
import { usePermissions } from '@/components/ui/hooks/usePermissions';
import AccessDenied from '@/components/ui/AccessDenied';
import ConfirmModal from '@/components/modals/confirmModal';
import SucessModal from '@/components/modals/sucessModal';
import {
  Container, Header, Title, Subtitle,
  StatsRow, StatBox, StatBoxValue, StatBoxLabel,
  TabRow, TabBtn,
  Controls, SearchBarWrapper, SearchIconWrap, SearchInputStyled,
  FilterRow, DropdownWrapper, DropdownBtn, DropdownList, DropdownItem,
  Btn,
  FormCard, FormSection, FormGrid, FormSectionTitle,
  FieldWrapper, Label, InputField, SelectField, ErrorMsg, TextareaField,
  CheckboxRow, CheckboxBox, CheckboxLabel,
  BtnRow,
  ComunicadoCard, ComunicadoHeader, ComunicadoTitle, ComunicadoMeta,
  ComunicadoBody, ComunicadoFooter,
  Badge, BadgeTipo, BadgeStatus,
  EmpresaChip, EmpresaChipList,
  EmptyState,
  PreviewBox, PreviewTitle, PreviewBody,
} from './styles';

type Tipo = 'manutencao' | 'novidade' | 'alerta' | 'cobranca';
type StatusCom = 'enviado' | 'agendado' | 'rascunho';

interface Comunicado {
  id: number;
  titulo: string;
  mensagem: string;
  tipo: Tipo;
  status: StatusCom;
  destinatarios: 'todas' | string[];
  dataEnvio: string;
  lidas: number;
  total: number;
}

interface ComunicadoForm {
  titulo: string;
  mensagem: string;
  tipo: Tipo;
  destinatario: 'todas' | 'selecionar';
  empresasSelecionadas: string[];
  agendar: boolean;
  dataAgendamento: string;
}

const EMPRESAS = [
  { id: 'e1', nome: 'Clínica Bella Vita'    },
  { id: 'e2', nome: 'Studio Ana Rodrigues'  },
  { id: 'e3', nome: 'Clínica Derma Saúde'   },
  { id: 'e4', nome: 'Instituto Skin Care'   },
  { id: 'e5', nome: 'Espaço Beleza Premium' },
];

const MOCK_COMUNICADOS: Comunicado[] = [
  {
    id: 1,
    titulo: 'Manutenção programada — 15/03/2025',
    mensagem: 'Informamos que o sistema ficará indisponível no dia 15/03/2025 das 02h às 04h para manutenção de infraestrutura. Durante este período, o acesso ao painel estará temporariamente suspenso.',
    tipo: 'manutencao',
    status: 'enviado',
    destinatarios: 'todas',
    dataEnvio: '10/03/2025',
    lidas: 4,
    total: 5,
  },
  {
    id: 2,
    titulo: 'Nova funcionalidade: Relatório de Fotos Clínicas',
    mensagem: 'Temos o prazer de anunciar o lançamento do módulo de Relatório de Fotos Clínicas. Agora é possível exportar comparativos antes/depois em PDF diretamente pela plataforma.',
    tipo: 'novidade',
    status: 'enviado',
    destinatarios: 'todas',
    dataEnvio: '05/03/2025',
    lidas: 5,
    total: 5,
  },
  {
    id: 3,
    titulo: 'Fatura vencida — regularize seu acesso',
    mensagem: 'Identificamos que sua fatura do mês de janeiro está em atraso. Para evitar a suspensão do acesso, realize o pagamento até 20/03/2025.',
    tipo: 'cobranca',
    status: 'enviado',
    destinatarios: ['e4'],
    dataEnvio: '12/03/2025',
    lidas: 0,
    total: 1,
  },
  {
    id: 4,
    titulo: 'Atualização de Termos de Uso — versão 2.1',
    mensagem: 'Nossos Termos de Uso foram atualizados. A nova versão entrará em vigor em 01/04/2025. Recomendamos a leitura completa antes desta data.',
    tipo: 'alerta',
    status: 'agendado',
    destinatarios: 'todas',
    dataEnvio: '25/03/2025',
    lidas: 0,
    total: 5,
  },
  {
    id: 5,
    titulo: 'Promoção: upgrade para Enterprise com desconto',
    mensagem: 'Por tempo limitado, clínicas no plano Pro podem migrar para o Enterprise com 20% de desconto no primeiro trimestre.',
    tipo: 'novidade',
    status: 'rascunho',
    destinatarios: ['e1', 'e5'],
    dataEnvio: '—',
    lidas: 0,
    total: 2,
  },
];

const tipoConfig: Record<Tipo, { label: string; bg: string; color: string }> = {
  manutencao: { label: 'Manutenção',  bg: 'rgba(107,114,128,0.1)', color: '#6b7280' },
  novidade:   { label: 'Novidade',    bg: 'rgba(59,130,246,0.1)',  color: '#3b82f6' },
  alerta:     { label: 'Alerta',      bg: 'rgba(214,138,0,0.1)',   color: '#d68a00' },
  cobranca:   { label: 'Cobrança',    bg: 'rgba(231,76,60,0.1)',   color: '#e74c3c' },
};

const statusConfig: Record<StatusCom, { label: string; bg: string; color: string }> = {
  enviado:   { label: 'Enviado',   bg: 'rgba(138,117,96,0.12)', color: '#8a7560' },
  agendado:  { label: 'Agendado',  bg: 'rgba(59,130,246,0.1)',  color: '#3b82f6' },
  rascunho:  { label: 'Rascunho',  bg: 'rgba(200,200,200,0.2)', color: '#999'    },
};

function nomeEmpresaById(id: string) {
  return EMPRESAS.find(e => e.id === id)?.nome ?? id;
}

function destinatarioLabel(d: Comunicado['destinatarios']) {
  if (d === 'todas') return 'Todas as empresas';
  return (d as string[]).map(nomeEmpresaById).join(', ');
}

function Field({ label, value, onChange, placeholder, error, disabled }: any) {
  return (
    <FieldWrapper>
      {label && <Label>{label}</Label>}
      <InputField value={value} onChange={onChange} placeholder={placeholder} $error={!!error} disabled={disabled} />
      {error && <ErrorMsg>{error}</ErrorMsg>}
    </FieldWrapper>
  );
}

function SField({ label, options, value, onChange }: any) {
  return (
    <FieldWrapper>
      {label && <Label>{label}</Label>}
      <SelectField value={value} onChange={(e: any) => onChange?.(e.target.value)}>
        {options.map((o: any) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </SelectField>
    </FieldWrapper>
  );
}

export default function Comunicados() {
  const { isSuperAdmin } = usePermissions();
  if (!isSuperAdmin) return <AccessDenied />;

  const [tab, setTab]               = useState<'lista' | 'novo'>('lista');
  const [comunicados, setComunicados] = useState<Comunicado[]>(MOCK_COMUNICADOS);
  const [search, setSearch]         = useState('');
  const [filterTipo, setFilterTipo] = useState('Todos');
  const [filterStatus, setFilterStatus] = useState('Todos');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [confirmModal, setConfirmModal] = useState(false);
  const [sucessModal, setSucessModal]   = useState<{ title: string; message: string } | null>(null);
  const [preview, setPreview]       = useState(false);
  const [errors, setErrors]         = useState<Record<string, string>>({});

  const [form, setForm] = useState<ComunicadoForm>({
    titulo: '', mensagem: '', tipo: 'novidade',
    destinatario: 'todas', empresasSelecionadas: [],
    agendar: false, dataAgendamento: '',
  });

  function setF(field: keyof ComunicadoForm, val: any) {
    setForm(p => ({ ...p, [field]: val }));
  }

  function toggle(name: string) {
    setOpenDropdown(p => p === name ? null : name);
  }

  function toggleEmpresa(id: string) {
    setForm(p => ({
      ...p,
      empresasSelecionadas: p.empresasSelecionadas.includes(id)
        ? p.empresasSelecionadas.filter(e => e !== id)
        : [...p.empresasSelecionadas, id],
    }));
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!form.titulo.trim())   e.titulo   = 'Título obrigatório';
    if (!form.mensagem.trim()) e.mensagem = 'Mensagem obrigatória';
    if (form.destinatario === 'selecionar' && form.empresasSelecionadas.length === 0) e.empresas = 'Selecione ao menos uma empresa';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleEnviar() {
    if (!validate()) return;
    setConfirmModal(true);
  }

  function handleConfirm() {
    setConfirmModal(false);
    const novo: Comunicado = {
      id: Date.now(),
      titulo: form.titulo,
      mensagem: form.mensagem,
      tipo: form.tipo,
      status: form.agendar ? 'agendado' : 'enviado',
      destinatarios: form.destinatario === 'todas' ? 'todas' : form.empresasSelecionadas,
      dataEnvio: form.agendar ? form.dataAgendamento : new Date().toLocaleDateString('pt-BR'),
      lidas: 0,
      total: form.destinatario === 'todas' ? EMPRESAS.length : form.empresasSelecionadas.length,
    };
    setComunicados(p => [novo, ...p]);
    setSucessModal({
      title: form.agendar ? 'Comunicado agendado!' : 'Comunicado enviado!',
      message: form.agendar
        ? `O comunicado "${form.titulo}" foi agendado para ${form.dataAgendamento}.`
        : `O comunicado "${form.titulo}" foi enviado para ${novo.total} empresa${novo.total !== 1 ? 's' : ''}.`,
    });
    setForm({ titulo: '', mensagem: '', tipo: 'novidade', destinatario: 'todas', empresasSelecionadas: [], agendar: false, dataAgendamento: '' });
    setTab('lista');
    setErrors({});
  }

  const filtered = comunicados.filter(c => {
    const matchSearch = c.titulo.toLowerCase().includes(search.toLowerCase());
    const matchTipo   = filterTipo === 'Todos' || c.tipo === filterTipo.toLowerCase().replace(' ', '');
    const matchStatus = filterStatus === 'Todos' || c.status === filterStatus.toLowerCase();
    return matchSearch && matchTipo && matchStatus;
  });

  const totalEnviados  = comunicados.filter(c => c.status === 'enviado').length;
  const totalAgendados = comunicados.filter(c => c.status === 'agendado').length;
  const taxaLeitura    = comunicados.filter(c => c.status === 'enviado').length > 0
    ? Math.round(comunicados.filter(c => c.status === 'enviado').reduce((a, c) => a + (c.lidas / c.total) * 100, 0) / comunicados.filter(c => c.status === 'enviado').length)
    : 0;

  return (
    <Container>
      <Header>
        <div>
          <Title>Comunicados</Title>
          <Subtitle>Envie avisos e notificações para todas ou algumas empresas</Subtitle>
        </div>
        <Btn $variant="primary" onClick={() => setTab('novo')}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
          Novo Comunicado
        </Btn>
      </Header>

      <StatsRow>
        <StatBox>
          <StatBoxValue>{comunicados.length}</StatBoxValue>
          <StatBoxLabel>Total</StatBoxLabel>
        </StatBox>
        <StatBox>
          <StatBoxValue>{totalEnviados}</StatBoxValue>
          <StatBoxLabel>Enviados</StatBoxLabel>
        </StatBox>
        <StatBox>
          <StatBoxValue>{totalAgendados}</StatBoxValue>
          <StatBoxLabel>Agendados</StatBoxLabel>
        </StatBox>
        <StatBox $highlight>
          <StatBoxValue>{taxaLeitura}%</StatBoxValue>
          <StatBoxLabel>Taxa de leitura</StatBoxLabel>
        </StatBox>
      </StatsRow>

      <TabRow>
        <TabBtn $active={tab === 'lista'} onClick={() => setTab('lista')}>Histórico</TabBtn>
        <TabBtn $active={tab === 'novo'}  onClick={() => setTab('novo')}>Novo Comunicado</TabBtn>
      </TabRow>

      {tab === 'lista' && (
        <>
          <Controls>
            <SearchBarWrapper>
              <SearchIconWrap>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </SearchIconWrap>
              <SearchInputStyled placeholder="Buscar comunicado..." value={search} onChange={(e: any) => setSearch(e.target.value)} />
            </SearchBarWrapper>
            <FilterRow>
              <DropdownWrapper>
                <DropdownBtn onClick={() => toggle('tipo')}>
                  Tipo: {filterTipo}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
                </DropdownBtn>
                {openDropdown === 'tipo' && (
                  <DropdownList>
                    {['Todos', 'Manutenção', 'Novidade', 'Alerta', 'Cobrança'].map(t => (
                      <DropdownItem key={t} $active={filterTipo === t} onClick={() => { setFilterTipo(t); toggle('tipo'); }}>
                        {t}
                      </DropdownItem>
                    ))}
                  </DropdownList>
                )}
              </DropdownWrapper>
              <DropdownWrapper>
                <DropdownBtn onClick={() => toggle('status')}>
                  Status: {filterStatus}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
                </DropdownBtn>
                {openDropdown === 'status' && (
                  <DropdownList>
                    {['Todos', 'Enviado', 'Agendado', 'Rascunho'].map(s => (
                      <DropdownItem key={s} $active={filterStatus === s} onClick={() => { setFilterStatus(s); toggle('status'); }}>
                        {s}
                      </DropdownItem>
                    ))}
                  </DropdownList>
                )}
              </DropdownWrapper>
            </FilterRow>
          </Controls>

          {filtered.length === 0 ? (
            <EmptyState>Nenhum comunicado encontrado.</EmptyState>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {filtered.map(c => (
                <ComunicadoCard key={c.id}>
                  <ComunicadoHeader>
                    <ComunicadoTitle>{c.titulo}</ComunicadoTitle>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
                      <BadgeTipo $bg={tipoConfig[c.tipo].bg} $color={tipoConfig[c.tipo].color}>
                        {tipoConfig[c.tipo].label}
                      </BadgeTipo>
                      <BadgeStatus $bg={statusConfig[c.status].bg} $color={statusConfig[c.status].color}>
                        {statusConfig[c.status].label}
                      </BadgeStatus>
                    </div>
                  </ComunicadoHeader>

                  <ComunicadoMeta>
                    {c.destinatarios === 'todas'
                      ? 'Para: Todas as empresas'
                      : `Para: ${(c.destinatarios as string[]).map(nomeEmpresaById).join(', ')}`}
                    {' · '}
                    {c.status === 'enviado' ? `Enviado em ${c.dataEnvio}` : c.status === 'agendado' ? `Agendado para ${c.dataEnvio}` : 'Rascunho'}
                  </ComunicadoMeta>

                  <ComunicadoBody>{c.mensagem}</ComunicadoBody>

                  {c.status === 'enviado' && (
                    <ComunicadoFooter>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ fontSize: '0.75rem', color: '#888' }}>
                          Lidas: <strong style={{ color: '#BBA188' }}>{c.lidas}</strong> / {c.total}
                        </div>
                        <div style={{ width: 80, height: 5, background: '#f0ebe4', borderRadius: 99, overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${c.total > 0 ? (c.lidas / c.total) * 100 : 0}%`, background: '#BBA188', borderRadius: 99 }} />
                        </div>
                      </div>
                    </ComunicadoFooter>
                  )}
                </ComunicadoCard>
              ))}
            </div>
          )}
        </>
      )}

      {tab === 'novo' && (
        <FormCard>
          <FormSection>
            <FormSectionTitle>Novo Comunicado</FormSectionTitle>
            <FormGrid>
              <FieldWrapper style={{ gridColumn: 'span 2' }}>
                <Label>Título *</Label>
                <InputField value={form.titulo} onChange={(e: any) => setF('titulo', e.target.value)} placeholder="Ex: Manutenção programada — 15/03/2025" $error={!!errors.titulo} />
                {errors.titulo && <ErrorMsg>{errors.titulo}</ErrorMsg>}
              </FieldWrapper>

              <SField label="Tipo" options={[
                { value: 'novidade',   label: 'Novidade'   },
                { value: 'manutencao', label: 'Manutenção' },
                { value: 'alerta',     label: 'Alerta'     },
                { value: 'cobranca',   label: 'Cobrança'   },
              ]} value={form.tipo} onChange={(v: string) => setF('tipo', v)} />

              <SField label="Destinatários" options={[
                { value: 'todas',     label: 'Todas as empresas'   },
                { value: 'selecionar', label: 'Selecionar empresas' },
              ]} value={form.destinatario} onChange={(v: string) => setF('destinatario', v)} />
            </FormGrid>

            {form.destinatario === 'selecionar' && (
              <div style={{ marginTop: 16 }}>
                <Label style={{ display: 'block', marginBottom: 10 }}>Selecione as empresas *</Label>
                <EmpresaChipList>
                  {EMPRESAS.map(e => (
                    <EmpresaChip
                      key={e.id}
                      $selected={form.empresasSelecionadas.includes(e.id)}
                      onClick={() => toggleEmpresa(e.id)}
                    >
                      {e.nome}
                    </EmpresaChip>
                  ))}
                </EmpresaChipList>
                {errors.empresas && <ErrorMsg style={{ marginTop: 6 }}>{errors.empresas}</ErrorMsg>}
              </div>
            )}

            <FieldWrapper style={{ marginTop: 16 }}>
              <Label>Mensagem *</Label>
              <TextareaField
                value={form.mensagem}
                onChange={(e: any) => setF('mensagem', e.target.value)}
                placeholder="Escreva aqui o conteúdo do comunicado..."
                $error={!!errors.mensagem}
                rows={5}
              />
              {errors.mensagem && <ErrorMsg>{errors.mensagem}</ErrorMsg>}
            </FieldWrapper>

            <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <CheckboxRow onClick={() => setF('agendar', !form.agendar)}>
                <CheckboxBox $checked={form.agendar}>
                  {form.agendar && <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>}
                </CheckboxBox>
                <CheckboxLabel>Agendar envio para data específica</CheckboxLabel>
              </CheckboxRow>

              {form.agendar && (
                <div style={{ paddingLeft: 28 }}>
                  <FieldWrapper>
                    <Label>Data de envio</Label>
                    <InputField type="date" value={form.dataAgendamento} onChange={(e: any) => setF('dataAgendamento', e.target.value)} $error={false} />
                  </FieldWrapper>
                </div>
              )}
            </div>
          </FormSection>

          {form.titulo && form.mensagem && (
            <div style={{ padding: '0 32px 20px' }}>
              <Label style={{ marginBottom: 10, display: 'block' }}>Pré-visualização</Label>
              <PreviewBox $tipo={form.tipo}>
                <PreviewTitle>{form.titulo}</PreviewTitle>
                <PreviewBody>{form.mensagem}</PreviewBody>
              </PreviewBox>
            </div>
          )}

          <BtnRow>
            <Btn onClick={() => { setTab('lista'); setErrors({}); }}>Cancelar</Btn>
            <Btn $variant="primary" onClick={handleEnviar}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              {form.agendar ? 'Agendar Comunicado' : 'Enviar Agora'}
            </Btn>
          </BtnRow>
        </FormCard>
      )}

      <ConfirmModal
        isOpen={confirmModal}
        title={form.agendar ? 'Agendar comunicado?' : 'Enviar comunicado?'}
        message={
          form.agendar
            ? `O comunicado "${form.titulo}" será agendado para ${form.dataAgendamento} e enviado para ${form.destinatario === 'todas' ? 'todas as empresas' : form.empresasSelecionadas.length + ' empresa(s)'}.`
            : `O comunicado "${form.titulo}" será enviado imediatamente para ${form.destinatario === 'todas' ? 'todas as empresas' : form.empresasSelecionadas.length + ' empresa(s)'}. Esta ação não pode ser desfeita.`
        }
        confirmText={form.agendar ? 'Agendar' : 'Enviar'}
        cancelText="Cancelar"
        onConfirm={handleConfirm}
        onCancel={() => setConfirmModal(false)}
      />

      <SucessModal
        isOpen={!!sucessModal}
        title={sucessModal?.title ?? ''}
        message={sucessModal?.message ?? ''}
        onClose={() => setSucessModal(null)}
      />
    </Container>
  );
}