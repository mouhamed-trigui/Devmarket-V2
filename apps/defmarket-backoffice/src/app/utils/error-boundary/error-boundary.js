import './error-boundary.module.scss';
import { ErrorBoundary } from 'react-error-boundary';
import { FormattedMessage } from 'react-intl';
import {
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonButton,
  IonCardHeader,
} from '@ionic/react';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <IonCard>
      <IonCardHeader color="danger">
        <IonCardTitle>
          {' '}
          <FormattedMessage description="Erreur" defaultMessage="Erreur" />
        </IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        <ion-text color="dark">
          <FormattedMessage
            description="Message d'erreur"
            defaultMessage="Une erreur s'est produite : {error}"
            values={{
              error: error.message,
            }}
          />
        </ion-text>

        <IonButton color="dark" onClick={resetErrorBoundary}>
          <FormattedMessage
            description="Réessayer"
            defaultMessage="Réessayer"
          />
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
}

export function ErrorBoundaryUI(props) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // reset the state of your app so the error doesn't happen again
      }}
    >
      {props.children}
    </ErrorBoundary>
  );
}
export default ErrorBoundaryUI;
