import React from "react";
import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="Comment jouer ?" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Trouver le mot en 6 essais. Après chaque supposition, la couleur des carreaux
        changera pour montrer à quel point votre supposition était proche du mot.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="W" status="correct" />
        <Cell value="E" />
        <Cell value="A" />
        <Cell value="R" />
        <Cell value="Y" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        La lettre W est au bon endroit.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="P" />
        <Cell value="I" />
        <Cell value="L" status="present" />
        <Cell value="O" />
        <Cell value="T" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        La lettre L est présente dans le mot mais n'est pas au bon endroit.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="V" />
        <Cell value="A" />
        <Cell value="G" />
        <Cell value="U" status="absent" />
        <Cell value="E" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        La lettre U n'est pas présente dans le mot.
      </p>
    </BaseModal>
  )
}
