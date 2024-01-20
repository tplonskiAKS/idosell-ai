export const headlineName = (route) => {
    switch (route) {
        case '/tools/autodescription':
            return 'Auto Description';
        case '/settings':
            return 'Settings';
        case '/about':
            return 'About';
    }
}

export const hint = (route) => {
    switch (route) {
        case '/tools/autodescription':
            return 'Auto Description is a tool integrated with IdoSell and OpenAI. \n\n It makes posibility to retrieve description based on the provided IDs in CSV file. CSV file must consist with three columns separated by semicolon: id, title, external_id.\n\n After the file is uploaded a job processing the products with OpenAI is build. \n When the job is done descriptions are automaticaly added to the IdoSell for each product.';
        case '/settings':
            return 'There is no information to display.';
        case '/about':
            return 'There is no information to display.';
    }
}