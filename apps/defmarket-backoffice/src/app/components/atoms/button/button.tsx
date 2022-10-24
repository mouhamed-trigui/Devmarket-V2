import './button.module.scss';
import { IonButton, IonIcon, IonContent } from '@ionic/react';
import { star } from 'ionicons/icons';
/* eslint-disable-next-line */
export interface ButtonProps {
  // Title
  title:string,
  // Colors 
  color:string,
  // Disabled
  disabled:boolean
  size:"default" | "large" | "small" | undefined,
  // Expand
  expand: "full" | "block" | undefined,
  // Round
  shape:"round" | undefined,
  // Fill
  fill:'clear' | 'outline' | 'solid' | 'default',
  // Left OR Right Icon
  slot:string,
  showIcon:boolean,
  icon:'string | undefined',

}

export function Button(props: ButtonProps) {
  return  (
    <IonButton color={props?.color} expand={props?.expand} shape={props?.shape} fill={props?.fill} slot={props?.slot}  disabled={props?.disabled ?? false} size={props?.size}>{props?.title ?? "Default"}
    {props?.showIcon && <IonIcon slot={props?.slot ?? "start" } icon={props?.icon ?? star} /> }
    </IonButton>
)
}

export default Button;
