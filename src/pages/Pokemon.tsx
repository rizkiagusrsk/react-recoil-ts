import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { listPokemon } from "../store";
import { Popup } from "reactjs-popup";
import "../style/modal.css";
import { useIsMobile } from "../hooks/useIsMobile";
import Sheet from "react-modal-sheet";

interface DetailPokemon {
  name: string;
  base_experience: number;
  height: number;
  weight: number;
}

export const Pokemon = () => {
  const [pokemon, setPokemon] = useRecoilState(listPokemon);
  const [detailPokemon, setDetailPokemon] = useState<DetailPokemon>();
  const isMobile = useIsMobile();
  const [bottomSheetOpen, setBottomSheetOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const getPokemon = async () => {
      const url = "https://pokeapi.co/api/v2/pokemon";
      const response = await fetch(url);
      const body = await response.json();
      setPokemon(body.results);
    };

    getPokemon();
  }, [setPokemon]);

  const getDetailPokemon = async (pokemon: string) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    const response = await fetch(url);
    const body = await response.json();
    setDetailPokemon(body);
  };

  const onClickDetailPokemon = (pokemon: string) => {
    getDetailPokemon(pokemon);
    isMobile ? setBottomSheetOpen(true) : setIsModalOpen(!isModalOpen);
  };

  const StatPokemon = ({
    nameStat,
    detailStat,
  }: {
    nameStat?: string;
    detailStat?: number;
  }) => {
    return (
      <div className="tw-flex tw-flex-col">
        <div className="tw-font-bold">{nameStat}</div>
        <div className="tw-text-center">{detailStat}</div>
      </div>
    );
  };

  return (
    <>
      <div
        className={`${
          isMobile
            ? "tw-flex tw-flex-col tw-gap-y-5"
            : "tw-grid tw-grid-cols-4 tw-gap-y-2 tw-gap-x-2"
        } tw-mt-10 container tw-text-center`}
      >
        {pokemon.map((poke: { url: string; name: string }) => (
          <div key={poke.url} onClick={() => onClickDetailPokemon(poke.name)}>
            <div className="tw-p-4 tw-text-white tw-capitalize tw-border tw-rounded-lg hover:tw-text-indigo-950 hover:tw-border-neutral-400 tw-cursor-pointer">
              {poke.name}
            </div>
          </div>
        ))}
      </div>
      {isMobile ? (
        <Sheet
          isOpen={bottomSheetOpen}
          onClose={() => setBottomSheetOpen(false)}
          detent="content-height"
        >
          <Sheet.Container>
            <Sheet.Header></Sheet.Header>
            <Sheet.Content>
              <div className="tw-bg-white tw-p-4 tw-w-full">
                <div className="tw-flex tw-justify-between tw-mb-4">
                  <div className="tw-capitalize tw-font-bold">
                    {detailPokemon?.name}
                  </div>
                  <button
                    className="tw-self-end tw-font-bold hover:tw-text-blue-400"
                    onClick={() => setBottomSheetOpen(false)}
                  >
                    X
                  </button>
                </div>
                <div className="tw-flex tw-gap-x-4">
                  <StatPokemon
                    nameStat="EXP"
                    detailStat={detailPokemon?.base_experience}
                  />
                  <StatPokemon
                    nameStat="HEIGHT"
                    detailStat={detailPokemon?.height}
                  />
                  <StatPokemon
                    nameStat="WEIGHT"
                    detailStat={detailPokemon?.weight}
                  />
                </div>
              </div>
            </Sheet.Content>
          </Sheet.Container>
          <Sheet.Backdrop onTap={() => setBottomSheetOpen(false)} />
        </Sheet>
      ) : (
        <Popup open={isModalOpen} onClose={() => setIsModalOpen(false)} modal>
          <div className="tw-bg-white tw-border tw-rounded-lg tw-p-4 tw-w-full">
            <div className="tw-flex tw-justify-between">
              <div className="tw-capitalize tw-font-bold">
                {detailPokemon?.name}
              </div>
              <button
                className="tw-self-end tw-font-bold hover:tw-text-blue-400"
                onClick={() => setIsModalOpen(false)}
              >
                X
              </button>
            </div>
            <div className="tw-border-b-4 tw-my-3" />
            <div className="tw-flex tw-gap-x-4">
              <StatPokemon
                nameStat="EXP"
                detailStat={detailPokemon?.base_experience}
              />
              <StatPokemon
                nameStat="HEIGHT"
                detailStat={detailPokemon?.height}
              />
              <StatPokemon
                nameStat="WEIGHT"
                detailStat={detailPokemon?.weight}
              />
            </div>
          </div>
        </Popup>
      )}
    </>
  );
};
