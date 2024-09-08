import { Modal, Box } from '@mui/material'
import React, { FC } from 'react'

interface Prop {
    open: boolean,
    setOpen: (open: boolean) => void
    component: any,
    setRoute?: (route: string) => void
    route: string
}

const CustomModel: FC<Prop> = ({ open, setOpen, route, setRoute, component: Component }) => {
    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white  rounded-[8px] shadow p-4 outline-none"
            >
                <Component setOpen={setOpen} setRoute={setRoute} />
            </Box>

        </Modal>
    )
}

export default CustomModel