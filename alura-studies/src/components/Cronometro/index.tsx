import { useEffect, useState } from "react";
import Botao from "../Botao";
import { ITarefa } from "../types/tarefa";
import style from './Cronometro.module.scss';
import Relogio from "./Relogio";
import { tempoParaSegundos } from "../../common/utils/time";

interface Props {
  selecionado: ITarefa | undefined
}

export default function Cronometro({ selecionado }: Props) {
  const [tempo, setTempo] = useState<number>();

  useEffect(() => {
    if(selecionado?.tempo){
      setTempo(tempoParaSegundos(selecionado.tempo))
    }
  }, [selecionado])

  function regressiva(tempo: number = 0) {
    setTimeout(() => {
      if(tempo > 0) {
        setTempo(tempo - 1);
        return regressiva(tempo - 1);
      }
    }, 1000)
  }

  return (
    <div className={style.cronometro}>
      <p className={style.titulo}>Escolha um card e inicie o Cronômetro</p>
      <div className={style.relogioWrapper}>
        <Relogio tempo={tempo} />
      </div>
      <Botao onClick={() => regressiva(tempo)} >
        Começar!
      </Botao>
    </div>
  )
}