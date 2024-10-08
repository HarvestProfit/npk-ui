import React, { useState } from 'react';
import { Button, Offcanvas, OffcanvasBody, OffcanvasHeader } from '@harvest-profit/npk';

function Example(args) {
  const [open, setOpen] = useState();
  const toggle = () => setOpen(!open);

  return (
    <div>
      <Button
        color="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        Open
      </Button>
      <Offcanvas {...args} isOpen={open} toggle={toggle}>
        <OffcanvasHeader toggle={toggle}>Offcanvas</OffcanvasHeader>
        <OffcanvasBody>
          <strong>This is the Offcanvas body.</strong>
        </OffcanvasBody>
      </Offcanvas>
    </div>
  );
}

export default Example;
