import AddIdea from '@/components/AddIdea';
import { createIdea} from '@/lib/data';
import React from 'react';


const AddIdeaPage = () => {
    return (
        <div>
            <AddIdea createUserAction={createIdea}></AddIdea>
        </div>
    );
};

export default AddIdeaPage;