import {
  Box,
  Stack,
  Typography,
  Skeleton,
  Breadcrumbs as MUIBreadcrumbs,
  Link,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import type { FC, ReactNode } from 'react';
import type { LinkProps } from '@mui/material';

interface CrumbProps {
  label: string;
  path?: string;
  loading?: boolean;
}

interface BreadcrumbHeaderProps {
  title: string;
  actions?: ReactNode;
  loading?: boolean;
  crumbs?: CrumbProps[];
}
interface LinkRouterProps extends LinkProps {
  to: string;
  replace?: boolean;
}

function LinkRouter(props: LinkRouterProps) {
  return <Link {...props} component={RouterLink as any} />;
}

export const BreadcrumbHeader: FC<BreadcrumbHeaderProps> = ({
  title,
  actions,
  loading,
  crumbs,
}) => {
  return (
    <Box mb={4}>
      <Stack justifyContent="space-between" alignItems="flex-start" direction="row">
        <Stack direction="column">
          <Typography variant="h4">{loading ? <Skeleton /> : title}</Typography>

          {crumbs && crumbs.length > 0 && (
            <MUIBreadcrumbs aria-label="breadcrumb">
              <LinkRouter underline="hover" color="inherit" to="/">
                Home
              </LinkRouter>
              {crumbs.map((crumb, index) => {
                const last = index === crumbs.length - 1;
                if (crumb.loading) {
                  return (
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: '1rem' }}
                      width={75}
                      key={crumb.label}
                    />
                  );
                }
                return last || !crumb.path ? (
                  <Typography color="text.primary" key={crumb.label}>
                    {crumb.label}
                  </Typography>
                ) : (
                  <LinkRouter underline="hover" color="inherit" to={crumb.path} key={crumb.path}>
                    {crumb.label}
                  </LinkRouter>
                );
              })}
            </MUIBreadcrumbs>
          )}
        </Stack>

        {actions && <Box>{actions}</Box>}
      </Stack>
    </Box>
  );
};
