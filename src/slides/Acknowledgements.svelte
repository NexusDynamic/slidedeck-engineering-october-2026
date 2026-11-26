<script lang="ts">
    import Slide from "../components/Slide.svelte";
    import lab from "$siteStatic/_assets/images/_vault/rise-together/lab-setup.jpg";
    const people = [
        {
            role: "Primary supervisor",
            name: "Anna Zamm",
            title: "Associate Professor",
            where: "Department of Linguistics, Cognitive Science and Semiotics",
            photo: "people/anna-zamm.jpg",
        },
        {
            role: "Co-supervisor",
            name: "Simon Lind Kappel",
            title: "Assistant Professor",
            where: "Department of Electrical and Computer Engineering – Biomedical Engineering",
            photo: "people/simon-lind-kappel.jpg",
        },
        {
            role: "Co-supervisor",
            name: "Chris Mathys",
            title: "Professor",
            where: "Interacting Minds Center",
            photo: "people/chris-mathys.jpg",
        },
    ];
</script>

<Slide title="Acknowledgements" prompt="git shortlog -s">
    <div class="people">
        {#each people as p (p.name)}
            <div class="person">
                <img src={import.meta.env.BASE_URL + p.photo} alt="" />
                <div>
                    <p class="role">{p.role}</p>
                    <h3>{p.name}</h3>
                    <p>{p.title}</p>
                    <p class="where">{p.where}<br />Aarhus University</p>
                </div>
            </div>
        {/each}
    </div>
</Slide>

<Slide title="Thank you" prompt="echo thanks" class="thanks">
    <dl>
        <dt>You</dt>
        <dd>for listening</dd>
        <dt>Center for Ear-EEG</dt>
        <dd>for hosting the workshop, and for a space to run my experiment</dd>
        <dt>Anna &amp; Simon</dt>
        <dd>for organising the event</dd>
    </dl>
    <figure>
        <img
            src={lab}
            alt="The Rise Together game: a ball balanced on a paddle, with lift-left and lift-right buttons"
        />
        <figcaption>The lab</figcaption>
    </figure>
    {#snippet notes()}
        <p>Thank you all for listening.</p>
        <p>
            Thanks to the Center for Ear-EEG for hosting this workshop, and for
            providing a space for my experiment.
        </p>
        <p>And thanks to Anna and Simon for organising the event.</p>
        <p>[then go to the references slide and leave it up for questions]</p>
    {/snippet}
</Slide>
