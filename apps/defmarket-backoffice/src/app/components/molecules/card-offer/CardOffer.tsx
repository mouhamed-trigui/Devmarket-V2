import { Box, Stack, Typography } from '@mui/material';
import { ReactComponent as InformationSvg } from '../../../../assets/svg/information.svg';

export interface ICardProps {
    backGroundColor: string;
    value: string;
    sign?: string;
    title?: string;
    isCoupon?: boolean;
}
const CardOffer = (props: ICardProps) => {
    return props.isCoupon ? (
        <Stack
            position="relative"
            style={{
                backgroundColor: props.backGroundColor,
                color: 'white',
            }}
            padding={1}
            textAlign="center"
            borderRadius={2}
        >
            <Stack position="absolute" right={8}>
                <InformationSvg />
            </Stack>
            <Typography variant="h1">{props.value}</Typography>
        </Stack>
    ) : (
        <Box
            style={{
                backgroundColor: props.backGroundColor,
                color: 'white',
                padding: 10,
                borderRadius: 15,
                width: 120,
            }}
        >
            <Stack alignItems="flex-end">
                <InformationSvg />
            </Stack>

            <Typography variant="h1" textAlign="center" marginBottom={1}>
                {props.value + (props.sign ?? '')}
            </Typography>
            <Typography variant="body2" textAlign="center" color="white">
                {props.title}
            </Typography>
        </Box>
    );
};

export default CardOffer;
