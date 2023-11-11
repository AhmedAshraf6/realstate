import React from 'react';

export default function ConfirmModal({ open, handleToggle, confirm }) {
  return (
    <dialog
      id='user_modal'
      className={`modal modal-bottom sm:modal-middle ${open && 'modal-open'}`}
    >
      <div className='modal-box'>
        <form method='dialog'>
          {/* if there is a button in form, it will close the modal */}
          <button
            className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
            onClick={() => {
              handleToggle();
            }}
          >
            ✕
          </button>
        </form>
        <div className='text-center'>
          <h3 className='text-base-content font-semibold '>
            Are you sure you want to delete the account?
          </h3>
          <button
            className='btn btn-neutral btn-sm mt-4'
            onClick={() => {
              confirm();
              handleToggle();
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </dialog>
  );
}
