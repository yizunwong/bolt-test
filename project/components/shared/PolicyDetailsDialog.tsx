import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Typography, Chip, Divider, Grid, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { format } from 'date-fns';

export interface Policy {
  id: string | number;
  name: string;
  category?: string;
  provider?: string;
  coverage?: string | number;
  premium?: string | number;
  sales?: number | string;
  revenue?: string | number;
  created?: Date | string;
  lastUpdated?: Date | string;
  description?: string;
  features?: string[];
  terms?: string;
  status?: 'active' | 'inactive';
}

export interface PolicyDetailsDialogProps {
  policy: Policy;
  open: boolean;
  onClose: () => void;
}

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2, 3),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const Section = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  fontWeight: 600,
}));

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const numberFormatter = new Intl.NumberFormat('en-US');

function formatValue(value?: string | number, opts?: { currency?: boolean }) {
  if (value === undefined || value === null) return '-';
  if (typeof value === 'number') {
    return opts?.currency ? currency.format(value) : numberFormatter.format(value);
  }
  return value;
}

function formatDate(value?: Date | string) {
  if (!value) return '';
  const date = typeof value === 'string' ? new Date(value) : value;
  return format(date, 'PPP');
}

export function PolicyDetailsDialog({ policy, open, onClose }: PolicyDetailsDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <Header>
        <Typography variant="h6" component="div" noWrap>
          {policy.name}
        </Typography>
        <Chip
          label={policy.status === 'active' ? 'Active' : 'Inactive'}
          color={policy.status === 'active' ? 'success' : 'default'}
          size="small"
          sx={{ marginLeft: 1 }}
        />
        <IconButton onClick={onClose} size="small" sx={{ marginLeft: 'auto' }}>
          <CloseIcon />
        </IconButton>
      </Header>
      <DialogContent dividers sx={{ padding: 3 }}>
        <Section>
          <SectionTitle variant="subtitle1">Basic Information</SectionTitle>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">
                Policy ID
              </Typography>
              <Typography variant="body1" noWrap>
                {policy.id}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">
                Category
              </Typography>
              <Typography variant="body1" noWrap>
                {policy.category || '-'}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">
                Provider
              </Typography>
              <Typography variant="body1" noWrap>
                {policy.provider || '-'}
              </Typography>
            </Grid>
          </Grid>
        </Section>

        <Divider />

        <Section>
          <SectionTitle variant="subtitle1">Financial Details</SectionTitle>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">
                Coverage
              </Typography>
              <Typography variant="body1" noWrap>
                {formatValue(policy.coverage, { currency: typeof policy.coverage === 'number' })}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">
                Premium
              </Typography>
              <Typography variant="body1" noWrap>
                {formatValue(policy.premium, { currency: typeof policy.premium === 'number' })}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">
                Sales
              </Typography>
              <Typography variant="body1" noWrap>
                {formatValue(policy.sales)}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">
                Revenue
              </Typography>
              <Typography variant="body1" noWrap>
                {formatValue(policy.revenue, { currency: typeof policy.revenue === 'number' })}
              </Typography>
            </Grid>
          </Grid>
        </Section>

        <Divider />

        <Section>
          <SectionTitle variant="subtitle1">Dates</SectionTitle>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">
                Created
              </Typography>
              <Typography variant="body1" noWrap>
                {formatDate(policy.created)}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">
                Last Updated
              </Typography>
              <Typography variant="body1" noWrap>
                {formatDate(policy.lastUpdated)}
              </Typography>
            </Grid>
          </Grid>
        </Section>

        {policy.description && (
          <Section>
            <SectionTitle variant="subtitle1">Description</SectionTitle>
            <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
              {policy.description}
            </Typography>
          </Section>
        )}

        {policy.features && policy.features.length > 0 && (
          <Section>
            <SectionTitle variant="subtitle1">Features</SectionTitle>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {policy.features.map((feature, idx) => (
                <Chip key={idx} label={feature} size="small" />
              ))}
            </Box>
          </Section>
        )}

        {policy.terms && (
          <Section>
            <SectionTitle variant="subtitle1">Terms</SectionTitle>
            <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
              {policy.terms}
            </Typography>
          </Section>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default PolicyDetailsDialog;
