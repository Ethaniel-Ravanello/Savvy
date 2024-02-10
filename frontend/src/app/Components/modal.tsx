import { useRouter } from "next/navigation";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { isRedirectError } from "next/dist/client/components/redirect";

interface ModalStruct {
  isOpen: boolean;
  header: string;
  body: string;
  button: string;
  isRedirect: boolean;
  href: string;
}

export default function MyModal({
  myModal,
  setMyModal,
}: {
  myModal: ModalStruct;
  setMyModal: React.Dispatch<React.SetStateAction<ModalStruct>>;
}) {
  const router = useRouter();
  return (
    <>
      <Transition appear show={myModal.isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setMyModal((prevState) => ({
              ...prevState,
              isOpen: false,
            }));
            myModal.isRedirect === true ? router.push(`${myModal.href}`) : null;
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-black border-2 border-slate-900 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-white"
                  >
                    {myModal.header}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-slate-200">{myModal.body}</p>
                  </div>

                  <div className="mt-4 ml-auto w-fit">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                      onClick={() => {
                        setMyModal((prevState) => ({
                          ...prevState,
                          isOpen: false,
                        }));
                        myModal.isRedirect === true
                          ? router.push(`${myModal.href}`)
                          : null;
                      }}
                    >
                      {myModal.button}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
