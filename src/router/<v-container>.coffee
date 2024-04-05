<v-container>
      <v-data-table
        :headers="headers"
        :search="searchQuery"
        :items="displayedItems"
        :rows-per-page-items="itemsPerPage"
        :footer-props="footerProps"
        density="default"
      >
        <template v-slot:item="{ item, index }">
          <tr>
            <template
              v-for="(header, headerIndex) in headers"
              :key="headerIndex"
            >
              <td>
                <template
                  v-if="index === 0 && headerIndex !== headers.length - 1"
                >
                  <v-text-field
                    v-model="header.search"
                    outlined
                    hide-details
                    @keydown.enter="filterOnEnter"
                    @blur="filterOnBlur"
                    ref="searchFields"
                    style="
                      width: 100%;
                      background-color: #ffffff;
                      border: 1px solid #cccccc;
                      border-radius: 5px;
                    "
                    :class="{ focused: isFocused }"
                  ></v-text-field>
                </template>
                <template v-else-if="headerIndex !== headers.length - 1">
                  {{ item[header.value] }}
                </template>
                <template v-else>
                  <div
                    v-if="index !== 0 && headerIndex === headers.length - 1"
                    class="custom-td"
                  >
                    <div
                      class="btn-pointer"
                      @click="redirectToView(item.id)"
                      v-b-tooltip.hover
                      title="Visualizar"
                    >
                      <img
                        style="width: 40px; height: 40px"
                        src="../../assets/visualizar.png"
                        alt="Visualizar"
                      />
                    </div>
                    <div
                      class="btn-pointer"
                      @click="redirectToUpdate(item.id)"
                      v-b-tooltip.hover
                      title="Editar"
                    >
                      <img
                        style="width: 40px; height: 40px"
                        src="../../assets/editar.png"
                        alt="Visualizar"
                      />
                    </div>
                    <div
                      class="btn-pointer"
                      id="exclusão"
                      @click="toggleExclusion(item)"
                      v-b-tooltip.hover
                      title="Excluir"
                    >
                      <img
                        v-if="item.excluido"
                        src="../../assets/excluido.png"
                        alt="Excluir"
                        class="trash-icon"
                        style="width: 40px; height: 40px"
                      />
                      <img
                        v-else
                        src="../../assets/ativo.png"
                        alt="Excluir"
                        class="trash-icon"
                        style="width: 40px; height: 40px"
                      />
                    </div>
                  </div>
                </template>
              </td>
            </template>
          </tr>
        </template>
      </v-data-table>
    </v-container>