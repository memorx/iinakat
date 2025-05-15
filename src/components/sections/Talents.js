import React, { useState } from 'react';

import Footer from '../commons/Footer';
import HeroTalent from './talents/HeroTalentSection';
import SearchPositions from './talents/SearchPositionsSection';

const Talents = () => {

    return (
        <>
            <section className="bg-custom-beige text-text-black pt-20">
                <HeroTalent />
                <SearchPositions />
            </section>
            <Footer />
        </>
    );
};

export default Talents;