import { ReactNode } from 'react';

import Card, { cardClasses } from '@mui/material/Card';
import CardContent, { cardContentClasses } from '@mui/material/CardContent';
import CardHeader, { cardHeaderClasses } from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';

interface Props {
  children: ReactNode;
  subheader?: ReactNode;
  title?: ReactNode;
}

/**
 * This component is used to visually group form fields.
 *
 * @public
 */
export function FormFieldGroup({ children, subheader, title }: Props) {
  return (
    <Card>
      <CardHeader subheader={subheader} title={title} />
      <CardContent
        sx={{
          paddingBottom: 4,
          paddingRight: 3,
          paddingTop: 0.5,
          [`.${cardClasses.root}`]: {
            overflow: 'visible',
          },
          [`.${cardHeaderClasses.root}`]: {
            paddingBottom: 1,
            paddingLeft: 4,
            paddingTop: 0,
          },
          [`.${cardContentClasses.root}`]: {
            paddingBottom: 0,
            paddingLeft: 4,
            paddingRight: 0,
          },
        }}
      >
        <Stack spacing={2}>{children}</Stack>
      </CardContent>
    </Card>
  );
}
