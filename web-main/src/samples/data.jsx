export const graphSampleData = {
    "data": [
        {
            "data": {
                "id": "person",
                "label": "mdm: person"
            }
        },
        {
            "data": {
                "id": "Contact",
                "label": "mdm: Contact"
            }
        },
        {
            "data": {
                "id": "address",
                "label": "mdm: address"
            }
        },
        {
            "data": {
                "id": "phone_number",
                "label": "mdm: phone_number"
            }
        },
        {
            "data": {
                "id": "identifier",
                "label": "mdm: identifier"
            }
        },
        {
            "data": {
                "id": "contract_role",
                "label": "mdm: contract_role"
            }
        },
        {
            "data": {
                "id": "contract",
                "label": "mdm: contract"
            }
        },
        {
            "data": {
                "id": "AccountContactRelation",
                "label": "salesforce: AccountContactRelation"
            }
        },
        {
            "data": {
                "id": "Account",
                "label": "salesforce: Account"
            }
        },
        {
            "data": {
                "label": "RELATED",
                "source": "person",
                "target": "Contact"
            }
        },
        {
            "data": {
                "label": "RELATED",
                "source": "address",
                "target": "Contact"
            }
        },
        {
            "data": {
                "label": "RELATED",
                "source": "phone_number",
                "target": "Contact"
            }
        },
        {
            "data": {
                "label": "RELATED",
                "source": "identifier",
                "target": "Contact"
            }
        },
        {
            "data": {
                "label": "RELATED",
                "source": "contract_role",
                "target": "person"
            }
        },
        {
            "data": {
                "label": "RELATED",
                "source": "contract",
                "target": "contract_role"
            }
        },
        {
            "data": {
                "label": "RELATED",
                "source": "AccountContactRelation",
                "target": "Account"
            }
        },
        {
            "data": {
                "label": "RELATED",
                "source": "AccountContactRelation",
                "target": "Contact"
            }
        }
    ],
    "graphType": "entity"
}