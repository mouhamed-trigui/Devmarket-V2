import { Box, Divider, IconButton, Stack } from '@mui/material';
import checked from '../../../../assets/images/png/Trace.png';
import { ReactComponent as serSVG } from '../../../../assets/svg/user-jaune.svg';
export interface IStepperProps {
    activeIndex: number;
    setActiveIndex?: (index: number) => void;
    items: {
        active: any;
        inactive: any;
        completed?: boolean;
    }[];
}

const Stepper = (props: IStepperProps) => {
    return (
        <Stack
            direction="row"
            alignSelf="center"
            alignItems="center"
            width="100%"
        >
            {props.items.map((item, index) => (
                <Box key={index} alignItems="center">
                    <Stack direction="row" alignItems="center">
                        <IconButton
                            onClick={
                                item.completed
                                    ? undefined
                                    : () =>
                                          props?.setActiveIndex !== undefined
                                              ? props.setActiveIndex(index)
                                              : undefined
                            }
                            style={{ position: 'relative' }}
                        >
                            {props.activeIndex === index
                                ? item.active
                                : item.inactive}

                            {item.completed && (
                                <img
                                    src={checked}
                                    alt="Profil"
                                    width={20}
                                    height={20}
                                    style={{
                                        position: 'absolute',
                                        top: -2,
                                        right: -10,
                                    }}
                                />
                            )}
                        </IconButton>
                        {index < props.items.length - 1 && (
                            <Divider
                                style={{
                                    width: 48,
                                    alignSelf: 'center',
                                }}
                                color="#bfbfbf"
                            />
                        )}
                    </Stack>
                </Box>
            ))}
        </Stack>
    );
};

export default Stepper;
