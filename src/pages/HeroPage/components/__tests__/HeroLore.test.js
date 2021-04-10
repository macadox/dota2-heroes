import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HeroLore from "../HeroLore";

describe("HeroLore workflow", () => {
  it("should display default text if its missing", () => {
    render(<HeroLore />);

    const lore = screen.getByText("Hero has no lore added yet.");
    expect(lore).toBeInTheDocument();
  });

  it("should not display button if the text is less than 100 words", () => {
    render(
      <HeroLore
        heroLore={{
          tiny:
            "Coming to life as a chunk of stone, Tiny's origins are a mystery on which he continually speculates. He is a Stone Giant now, but what did he used to be? A splinter broken from a Golem's heel? A shard swept from a gargoyle-sculptor's workshop? A fragment of the Oracular Visage of Garthos? A deep curiosity drives him, and he travels the world tirelessly seeking his origins, his parentage, his people. As he roams, he gathers weight and size; the forces that weather lesser rocks, instead cause Tiny to grow and ever grow.",
        }}
        hero={{ name: "npc_dota_hero_tiny" }}
      />
    );
    const lore = screen.getByText(
      "Coming to life as a chunk of stone, Tiny's origins are a mystery on which he continually speculates. He is a Stone Giant now, but what did he used to be? A splinter broken from a Golem's heel? A shard swept from a gargoyle-sculptor's workshop? A fragment of the Oracular Visage of Garthos? A deep curiosity drives him, and he travels the world tirelessly seeking his origins, his parentage, his people. As he roams, he gathers weight and size; the forces that weather lesser rocks, instead cause Tiny to grow and ever grow."
    );
    expect(lore).toBeInTheDocument();
    const showMoreButton = screen.queryByRole("button", { name: /show more/ });
    expect(showMoreButton).not.toBeInTheDocument();
  });

  it("lore responds to button clicked", () => {
    render(
      <HeroLore
        heroLore={{
          bloodseeker:
            "Strygwyr the Bloodseeker is a ritually sanctioned hunter, Hound of the Flayed Twins, sent down from the mist-shrouded peaks of Xhacatocatl in search of blood. The Flayed Ones require oceanic amounts of blood to keep them sated and placated, and would soon drain their mountain empire of its populace if the priests of the high plateaus did not appease them. Strygwyr therefore goes out in search of carnage. The vital energy of any blood he lets, flows immediately to the Twins through the sacred markings on his weapons and armor. Over the years, he has come to embody the energy of a vicious hound; in battle he is savage as a jackal. Beneath the Mask of the Bloodseeker, in the rush of bloody quenching, it is said that you can sometime see the features of the Flayers taking direct possession of their Hound.",
        }}
        hero={{ name: "npc_dota_hero_bloodseeker" }}
      />
    );

    const lore = screen.getByText(
      "Strygwyr the Bloodseeker is a ritually sanctioned hunter, Hound of the Flayed Twins, sent down from the mist-shrouded peaks of Xhacatocatl in search of blood. The Flayed Ones require oceanic amounts of blood to keep them sated and placated, and would soon drain their mountain empire of its populace if the priests of the high plateaus did not appease them. Strygwyr therefore goes out in search of carnage. The vital energy of any blood he lets, flows immediately to the Twins through the sacred markings on his weapons and armor. Over the years, he has come to embody the energy of"
    );

    expect(lore).toBeInTheDocument();

    const showMoreButton = screen.queryByRole("button", { name: /show more/i });
    userEvent.click(showMoreButton);

    const lorePartTwo = screen.getByText(
      "a vicious hound; in battle he is savage as a jackal. Beneath the Mask of the Bloodseeker, in the rush of bloody quenching, it is said that you can sometime see the features of the Flayers taking direct possession of their Hound."
    );
    expect(lorePartTwo).toBeInTheDocument();
    expect(showMoreButton).toHaveTextContent(/show less/i);
  });
});
