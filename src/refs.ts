/** Citations for <Cite text={refs.x} />, in the same form as the post's footnotes. */
const doi = (id: string) => `<a href="https://doi.org/${id}">https://doi.org/${id}</a>`;

export const refs = {
	tajfel1971: `Tajfel, H., Billig, M. G., Bundy, R. P., & Flament, C. (1971). Social categorization and intergroup behaviour. European Journal of Social Psychology, 1(2), 149–178. ${doi('10.1002/ejsp.2420010202')}`,
	schilbach2025: `Schilbach, L., & Redcay, E. (2025). Synchrony Across Brains. Annual Review of Psychology, 76(1), 883–911. ${doi('10.1146/annurev-psych-080123-101149')}`,
	wheatley2024: `Wheatley, T., Thornton, M. A., Stolk, A., & Chang, L. J. (2024). The Emerging Science of Interacting Minds. Perspectives on Psychological Science, 19(2), 355–373. ${doi('10.1177/17456916231200177')}`,
	czeszumski2022: `Czeszumski, A., Liang, S. H.-Y., Dikker, S., König, P., Lee, C.-P., Koole, S. L., & Kelsen, B. (2022). Cooperative Behavior Evokes Interbrain Synchrony in the Prefrontal and Temporoparietal Cortex: A Systematic Review and Meta-Analysis of fNIRS Hyperscanning Studies. Eneuro, 9(2), ENEURO.0268-21.2022. ${doi('10.1523/ENEURO.0268-21.2022')}`,
	susnoschi2021: `Susnoschi Luca, I., Putri, F. D., Ding, H., & Vuckovič, A. (2021). Brain Synchrony in Competition and Collaboration During Multiuser Neurofeedback-Based Gaming. Frontiers in Neuroergonomics, 2. <a href="https://www.frontiersin.org/articles/10.3389/fnrgo.2021.749009">https://www.frontiersin.org/articles/10.3389/fnrgo.2021.749009</a>`,
	zamm2026: `Zamm, A., Kappel, S. L., Demos, A. P., Debener, S., & Konvalinka, I. (2026). The Tapping Orchestra: A 10-Person Platform for Measuring Behavioral & Neural Synchrony During Group Interaction (Version-01). Zenodo. ${doi('10.5281/ZENODO.19371498')}`,
	glover1999: `Glover, G. H. (1999). Deconvolution of Impulse Response in Event-Related BOLD fMRI. NeuroImage, 9(4), 416–429. ${doi('10.1006/nimg.1998.0419')}`,
	vesper2010: `Vesper, C., Butterfill, S., Knoblich, G., & Sebanz, N. (2010). A minimal architecture for joint action. Neural Networks, 23(8–9), 998–1003. ${doi('10.1016/j.neunet.2010.06.002')}`
};
